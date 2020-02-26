import queryResolvers from "../Query";
import db from "../../../db/index";

const allTestDiscussions = [
  {
    id: "1",
    title: "cat discussion",
    body: "cats cats cats",
    published: true
  },
  {
    id: "2",
    title: "dog discussion",
    body: "dogs only",
    published: true
  },
  {
    id: "3",
    title: "special discussion",
    body: "secret",
    published: false
  }
];

// Get discussions without joining to
// comments or users
// describe("Query.discussions", () => {
//   describe("given no query", () => {
//     it("returns all test discussions", () => {
//       const res = queryResolvers.Query.discussions({}, {}, { db });

//       const equalsExpected = _.isEqual(res, allTestDiscussions);

//       expect(equalsExpected).toEqual(true);
//     });
//   });

// describe("given an array of numbers", () => {
//     it("returns the max number", () => {
//     expect(max_number([1, 2, 3])).toEqual(3);
//     });
// });
// });

function sum(a, b) {
  return a + b;
}

describe('addition', () => {
  describe('when adding two numbers', () => {
    it('returns the sum', ()=>{
      expect(5).toEqual(sum(2,3))
    })
  })
})
module.exports = sum;
