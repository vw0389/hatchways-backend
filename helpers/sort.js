function sorting (posts, sortBy, ordering) {
    if (!sortBy) {
        sortBy = 'id';
    }
    if (!ordering) {
        ordering = 'asc';
    }
    if (ordering === 'asc') {
        posts = posts.sort((a, b) => (b[sortBy] < a[sortBy]) ? 1 : -1);
    } else {
        posts = posts.sort((a,b) => (b[sortBy] > a[sortBy] ? 1 : -1));
    }
    return posts;
}


module.exports = sorting;