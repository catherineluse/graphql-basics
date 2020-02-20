const mutationTypes = `
    type Mutation {
        createUser(data: CreateUserInput): User!
        createDiscussion(data: CreateDiscussionInput): Discussion!
        createRootComment(data: CreateCommentInput): Comment!
        createChildComment(data: CreateCommentInput): Comment!
    }
`;

export default mutationTypes;
