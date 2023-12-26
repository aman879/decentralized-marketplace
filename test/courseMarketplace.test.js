

    // INTERNAL
    // Mocha - testing framework
    // Chai - assertion JS library

    const CourseMarketplace = artifacts.require("CourseMarketplace")

    const getBalance = async (address) =>web3.eth.getBalance(address)
    const toBN = value => web3.utils.toBN(value)

    const getGas = async result => {
        const tx = await web3.eth.getTransaction(result.tx)
        const gasUsed = toBN(result.receipt.gasUsed)
        const gasPrice = toBN(tx.gasPrice)
        const gas = gasUsed.mul(gasPrice)

        return gas
    }

    contract("CourseMarketplace", accounts => {

        const courseId = "0x00000000000000000000000000003130";
        const proof = "0x0000000000000000000000000000313000000000000000000000000000003130";
        const value = "900000000";

        const courseId2 = "0x00000000000000000000000000002130";
        const proof2 = "0x0000000000000000000000000000213000000000000000000000000000002130";
        
        let _contract = null
        let contractOwner = null
        let buyer = null
        let courseHash = null

        before(async () => {
            _contract = await CourseMarketplace.deployed()
            contractOwner = accounts[0]
            buyer = accounts[1]
        })

        describe("Purchase the new course", () => {
            before(async () => {
                await _contract.purchaseCourse(courseId, proof, {
                    from: buyer,
                    value
                })
            })

            it("should not allow to repurchase the owned course", async () => {
                try {
                    await _contract.purchaseCourse(courseId, proof, {
                        from: buyer,
                        value
                    })
                } catch (error) {
                    assert(error, "Expected an error")
                }
            })

            it("can get the purchased course hash by index", async () => {
                const index = 0
                courseHash = await _contract.getCourseHash(index)

                const expectedHash = web3.utils.soliditySha3(
                    { type: "bytes16", value: courseId},
                    { type: "address", value: buyer}
                )

                assert.equal(courseHash, expectedHash, "Course hash should match expected hash")
            })

            it("should match the purchase course data", async () => {
                const expectedIndex = 0
                const expectedState = 0
                const course = await _contract.getCourseByHash(courseHash)

                assert.equal(course.id, expectedIndex, "Course index should be 0!")
                assert.equal(course.price, value, `Course price should be ${value}!`)
                assert.equal(course.proof, proof, `Course proof should be ${proof}!`)
                assert.equal(course.owner, buyer, `Course buyer should be ${buyer}!`)
                assert.equal(course.state, expectedState, `Course state should be ${expectedState}!`)

            })
        })

        describe("Activate the purchased course", () => {
            
            it("should not be able to activate beside contract owner", async () => {
                try {
                    await _contract.activateCourse(courseHash, {from: buyer})
                } catch (error) {
                    assert(error, "Expected an error")
                }
            })
            
            it("should have 'activated' status", async () => {
                await _contract.activateCourse(courseHash, {from: contractOwner})
                const course = await _contract.getCourseByHash(courseHash)
                const expectedState = 1

                assert.equal(course.state, expectedState, "Course should have 'activated' state")
            })
        })

        describe("Transfer ownership", () => {
            let currentOwner = null
            before(async () => {
                currentOwner = await _contract.getContractOwner()
            })

            it("getContractOwner should return deployer address", async () => {
                assert.equal(contractOwner, currentOwner, "Contract owner is not matching")
            })

            it("revert when tranfer ownership is not from owner", async () => {
                try {
                    await _contract.tranferOwnership(accounts[3], {from: accounts[4]})
                } catch (error) {
                    assert(error, "Expected an error")
                }
            })

            it("should transfer ownership", async () => {
                await _contract.tranferOwnership(accounts[2], {from: currentOwner})
                const owner = await _contract.getContractOwner()
                assert.equal(owner, accounts[2], `owner should be ${accounts[2]}` )
            })

            it("should transfer ownership back to initial owner", async () => {
                await _contract.tranferOwnership(contractOwner, {from: accounts[2]})
                const owner = await _contract.getContractOwner()
                assert.equal(owner, contractOwner, "Owner should be initial owner")
            })
        })

        describe("Deactivate Course", () => {
            let courseHash2 = null
            let currentOwner = null

            before(async () => {
                await _contract.purchaseCourse(courseId2, proof2, {from: buyer, value})
                courseHash2 = await  _contract.getCourseHash(1)
                currentOwner = await _contract.getContractOwner()
            })

            it("only owner can deactivate the course", async () => {
                try {
                    await _contract.deactivateCourse(courseHash2, {from: buyer})
                } catch (error) {
                    assert(error, "Expected an error")
                }
            })

            it("should have status of deactivated and price 0", async () => {
                const beforeTxContractBalance = await getBalance(_contract.address)
                const beforeTxBuyerBalance = await getBalance(buyer)
                const beforeTxOwnerBalance = await getBalance(currentOwner)
                
                const result = await _contract.deactivateCourse(courseHash2, {from: contractOwner})
                
                const afterTxContractBalance = await getBalance(_contract.address)
                const afterTxBuyerBalance = await getBalance(buyer)
                const afterTxOwnerBalance = await getBalance(currentOwner)

                const gas = await getGas(result)

                const course = await _contract.getCourseByHash(courseHash2)
                const expectedPrice = 0
                const expectedState = 2

                assert.equal(course.state, expectedState, "Course is not deactivated")
                assert.equal(course.price, expectedPrice, "Course price is not reseted to 0")

                assert.equal(
                    toBN(beforeTxOwnerBalance).sub(gas).toString(),
                    afterTxOwnerBalance,
                    "Contract Owner balance is not correct"
                )

                assert.equal(
                    toBN(beforeTxBuyerBalance).add(toBN(value)).toString(),
                    afterTxBuyerBalance,
                    "Buyer ballance is not correct"
                )

                assert.equal(
                    toBN(beforeTxContractBalance).sub(toBN(value)).toString(),
                    afterTxContractBalance,
                    "Contract balance is not correct"
                )
            })

            it("should not activate deactivated course", async () => {
                try {
                    await _contract.activateCourse(courseHash2, {from: contractOwner})
                } catch (error) {
                    assert(error, "Expected error")
                }
            })
        })

        describe("Repurchase course", () => {
            let courseHash2 = null

            before(async () => {
                courseHash2 = await  _contract.getCourseHash(1)
            })

            it("should not repurchase when the course doesnt exist", async () => {
                const notExistingHash = "0x073b177e5cdf84ecc6a0a8e750dfb3029f852c997df9d29c5ec3a2cf8c990c81"
                try {
                    await _contract.repurchaseCourse(notExistingHash, {from: buyer})
                } catch(error) {
                    assert(error, "expected an error")
                }
            })

            it("should not repurchase with wrong course owner", async () => {
                const notOwnerAddress = accounts[2]

                try {  
                    await _contract.repurchaseCourse(courseHash2, {from: notOwnerAddress})
                } catch (error) {
                    assert(error, "expected an error")
                }
            })

            it("should be able to repurchase with correct credentials", async() => {
                const beforeTxBuyerBalance = await getBalance(buyer)
                const beforeTxContractBalance = await getBalance(_contract.address)

                const result = await _contract.repurchaseCourse(courseHash2, {from: buyer, value})

                const afterTxBuyerBalance = await getBalance(buyer)
                const afterTxContractBalance = await getBalance(_contract.address)

                const gas = await getGas(result)

                const course = await _contract.getCourseByHash(courseHash2)
                const expectedState = 0

                assert.equal(course.state, expectedState, "Course is not in expected state")
                assert.equal(course.price, value, `Course price is not ${value}`)

                assert.equal(
                    toBN(beforeTxBuyerBalance).sub(toBN(value)).sub(gas).toString(), 
                    afterTxBuyerBalance, 
                    "Client balance is not correct"
                )

                assert.equal(
                    toBN(beforeTxContractBalance).add(toBN(value)).toString(),
                    afterTxContractBalance,
                    "Contract balance is not updated or correct"
                )
            })

            it("should not be able to repurchase same course", async() => {
                try {
                    await _contract.repurchaseCourse(courseHash2, {from: buyer, value})
                } catch(error) {
                    assert(error, "Expected an error")
                }
            })
        })

        describe("Receive funds", () => {
            it("should have transacted funds", async () => {
                const value = "100000000000000000"
                const contractBeforeTx = await getBalance(_contract.address)

                await web3.eth.sendTransaction({
                    from: buyer,
                    to: _contract.address,
                    value
                })

                const contractAfterTx = await getBalance(_contract.address)

                assert.equal(
                    toBN(contractBeforeTx).add(toBN(value)).toString(),
                    contractAfterTx,
                    "Value after transaction is not matching!"
                )
            })
        })

        describe("Normal withdraw", () => {
            const fundsToDeopsit = "100000000000000000"
            const fundsToWithdraw = "10000000000000000"

            before(async () => {
                await web3.eth.sendTransaction({
                    from: buyer,
                    to: _contract.address,
                    value: fundsToDeopsit
                })
            })

            it("should fail when someone else beside owner withdraw", async () => {
                try {
                    await _contract.withdraw(fundsToWithdraw, {from: buyer})
                } catch(error) {
                    assert(error, "Expected an error")
                }
            })

            it("should not withdraw when amount is greater than funds", async () => {
                const value = "1000000000000000000"
                try {
                    await _contract.withdraw(value, {from: contractOwner})
                } catch (error) {
                    assert(error, "Expected an error")
                }
            })

            it("should withdraw correctly", async () => {
                const ownerBalance = await getBalance(contractOwner)
                const result = await _contract.withdraw(fundsToWithdraw, {from: contractOwner})
                const newOwnerBalance = await getBalance(contractOwner)

                const gas = await getGas(result)

                assert.equal(
                    toBN(ownerBalance).add(toBN(fundsToWithdraw)).sub(gas).toString(),
                    newOwnerBalance,
                    "The new owner balance is not correct"
                )
            })
        })

        describe("Emergency Withdraw", () => {
            const fundsToDeopsit = "100000000000000000"
            before(async () => {
                await web3.eth.sendTransaction({
                    from: buyer,
                    to: _contract.address,
                    value: fundsToDeopsit
                })
            })

            after(async () => {
                await _contract.resumeContract({from: contractOwner})
            })

            it("should fail when contract is not stopped", async () => {
                try {
                    await _contract.emergencyWithdraw({from: contractOwner})
                } catch (error) {
                    assert(error, "Expected an error")
                }
            })

            it("should add funds to contract owner", async () => {
                await _contract.stopContract({from: contractOwner})

                const contractBalance = await getBalance(_contract.address)
                const ownerBalance = await getBalance(contractOwner)

                const result = await _contract.emergencyWithdraw({from: contractOwner})
                const gas = await getGas(result)

                const newContractBalance  = await getBalance(_contract.address)
                const newOwnerBalance = await getBalance(contractOwner)

                assert.equal(
                    toBN(ownerBalance).add(toBN(contractBalance)).sub(gas).toString(),
                    newOwnerBalance,
                    "Owner balance not correct"
                )

                assert.equal(newContractBalance, 0, "Not all fund went")
            })
        })
    })
