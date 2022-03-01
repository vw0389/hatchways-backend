function sorting (posts, sortBy, ordering) {
    if (!sortBy) {
        sortBy = 'id';
    }
    if (!ordering) {
        ordering = 'asc';
    }
    if (ordering === 'asc') {
        posts = posts.sort((a, b) => {
            var returning = 0;
            b[sortBy] < a[sortBy] ?  returning = 1 : returning = -1
            return returning;
        });
    } else {
        posts = posts.sort((a, b) => {
            var returning = 0;
            b[sortBy] > a[sortBy] ?  returning = 1 : returning = -1
            return returning;
        });
    }
    return posts;
}


module.exports = sorting;