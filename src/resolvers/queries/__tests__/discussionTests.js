import queryResolvers from "../Query";
import db from "../../../db/index";

const { discussions, users, comments } = db;

const s = item => {
  return JSON.stringify(item)
}

// Get discussions without joining to
// comments or users
describe("Discussion queries", () => {

  describe("Query.discussions", () => {
    it("returns all test discussions", () => {
      const res = queryResolvers.Query.discussions({}, {}, { db });
      expect(s(res)).toEqual(s(discussions));
    });
  });

  describe("Query.getDiscussion", () => {
    describe("given no query", () => {
      it("errors out", () => {
        const expected = new Error("Must provide a discussion ID")
        const res = queryResolvers.Query.getDiscussion({}, {}, { db })
        expect(expected).toEqual(res)
      })
    })
    describe("given a discussion ID", () => {
      it("returns an array of one discussion", () => {
        const expected = s([discussions[0]])
        const res = queryResolvers.Query.getDiscussion({}, {id: '1'}, { db })
        expect(s(res)).toEqual(s(res))
      })
    })
  })

  describe("Discussion.getRootComments", () => {
    describe("if the discussion has no comments", () => {
      it("returns an empty array", () => {
         const expected = s([])
         const res = queryResolvers.Query.getDiscussion({}, {id: '2'}, { db })
         expect(s(res)).toEqual(s([]))
      })
    })
    describe("if the discussion has comments", () => {
      it("returns an array of comments", () => {
        fail();
      })
    })
    describe("if the discussion has nested comments", () => {
      it("returns only comments without a parent comment ID", () => {
        fail();
      })
    })
  })

  describe("Discussion.authorId", () => {

    describe("if the discussion does not have an author", () => {
      it("errors out", () => {
        fail();
      })
    })
    
    describe("if the author ID is not in the database", () => {
      it("errors out", () => {
        fail();
      })
    })
    
    describe("if the author ID is valid", () => {
      it("returns an array of one author", () => {
        fail();
      })
    })
  })
});


