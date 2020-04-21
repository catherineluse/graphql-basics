import queryResolvers from "../Query";
import db from "../../../db/index";

const { discussions, users, comments } = db;

const s = item => {
  return JSON.stringify(item)
}

// Get comments without joining to
// comments or users
describe("Comment queries", () => {

  describe("Query.comments", () => {
    it("returns all test comments", () => {
      const res = queryResolvers.Query.comments({}, {}, { db });
      expect(s(res)).toEqual(s(comments));
    });
  });

  describe("Query.getComment", () => {
    describe("given no query", () => {
      it("errors out", () => {
        const expected = new Error("Must provide a comment ID")
        const res = queryResolvers.Query.getComment({}, {}, { db })
        expect(expected).toEqual(res)
      })
    })
    describe("given a comment ID", () => {
      it("returns an array of one comment", () => {
        const expected = s([comments[0]])
        const res = queryResolvers.Query.getComment({}, {id: '1'}, { db })
        expect(s(res)).toEqual(s(res))
      })
    })
  })

  describe("Comment.childComments", () => {
    describe("if the comment has no children", () => {
      it("returns an empty array", () => {
        fail();
      })
    })
    describe("if the comment has children", () => {
      it("returns an array of comments with the right parent comment ID", () => {
        fail();
      })
    })
    
  })

  describe("Comment.authorId", () => {
    describe("if the comment does not have an author", () => {
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

  describe("Comment.discussionId", () => {
    describe("if the comment does not have a discussion", () => {
      it("errors out", () => {})
    })
    describe("if the discussion ID is not in the database", () => {
      it("errors out", () => {})
    })
    describe("if the discussion ID is valid", () => {
      it("returns an array of one discussion", () => {})
    })
  })
});