
export const COURSE_STATES = {
    0: "purchased",
    1: "activated",
    2: "deactivated"
}


export const normalizeOwnedCourse = web3 => (course, ownedCourse) => {
    const price = web3.utils.fromWei(ownedCourse.price, "ether")
    const ownedCourseId = Number(ownedCourse.id)

    return {
        ...course,
        ownedCourseId: ownedCourseId,
        proof: ownedCourse.proof,
        owned: ownedCourse.owner,
        price: price,
        state: COURSE_STATES[ownedCourse.state]
    }
}