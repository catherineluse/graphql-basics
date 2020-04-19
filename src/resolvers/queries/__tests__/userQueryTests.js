import queryResolvers from "../Query";
import db from "../../../db/index";

const { discussions, users, comments } = db;

const s = item => {
  return JSON.stringify(item)
}

// Get users
describe("User queries", () => {

  describe("Query.users", () => {
    it("returns all test users", () => {
      const res = queryResolvers.Query.users({}, {}, { db });
      expect(s(res)).toEqual(s(users));
    });
  });

  describe("Query.getUser", () => {
    describe("given no query", () => {
      it("errors out", () => {
        const expected = new Error("Must provide a user ID")
        const res = queryResolvers.Query.getUser({}, {}, { db })
        expect(expected).toEqual(res)
      })
    })
    describe("given a user ID", () => {
      it("returns an array of one user", () => {
        const expected = s([users[0]])
        const res = queryResolvers.Query.getUser({}, {id: '1'}, { db })
        expect(s(res)).toEqual(s(res))
      })
    })
  })

  describe("User.posts", () => {
    describe("if the user authored posts", () => {
      it("returns an array of their posts", () => {
        fail();
      })
    })
    describe("if the user did not author posts", () => {
      it("returns an empty array", () => {
        fail();
      })
    })
  })

  describe("User.comments", () => {
    describe("if the user authored comments", () => {
      it("returns an array of their comments", () => {
        fail();
      })
    })
    describe("if the user did not author comments", () => {
      it("returns an empty array", () => {
        fail();
      })
    })
  })
 
});


// query {
//   users {
//     name
//     id 
//     email
//   }
// }