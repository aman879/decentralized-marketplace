

    // INTERNAL
    // Mocha - testing framework
    // Chai - assertion JS library

    const CourseMarketplace = artifacts.require("CourseMarketplace")

    contract("CourseMarketplace", accounts => {

        let _contract = null
        let contractOwner = null
        let buyer = null

        before(async () => {
            _contract = await CourseMarketplace.deployed()
            contractOwner = accounts[0]
            buyer = accounts[1]

            console.log(_contract, contractOwner, buyer)
        })

        describe("Purchase the new course", () => {
            it("should resolve into true value", () => {
                assert(true, "Test is passing")
            })
        })
    })
