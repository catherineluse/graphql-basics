const mutationTypes = `
    type Mutation {
        createUser(data: CreateUserInput): User!
        createDiscussion(data: CreateDiscussionInput): Discussion!
        createComment(data: CreateCommentInput): Comment!
    }
`;

export default mutationTypes;
