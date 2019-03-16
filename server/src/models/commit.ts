export interface Commit {
    id: string
    comment: string
    contributor: string
    /**
     * XXX: will pass date directly to the client as we are not going to process it right now
     */
    date: string
}
