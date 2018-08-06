let timeout = setTimeout(function it() {
    if (isExtensionExist !== undefined) {
        addPostHandler();
        document.querySelector("#loadMyPosts").addEventListener("click", () => loadMyPosts());
        document.querySelector("#loadMyVotes").addEventListener("click", () => loadMyVotes());
        document.querySelector("#loadTopPosts").addEventListener("click", () => loadTopPosts());
    } else {
        timeout = setTimeout(it, 200);
    }
}, 200);

function addPostHandler() {
    let form = document.querySelector("#createPost");
    form.onsubmit = function (event) {
        event.preventDefault();
        let post = {};
        post.title = document.querySelector("#title").value;

        apiClient.addOrUpdate(post, (resp) => {});
    }
}

function addVoteHandler(postId) {
    apiClient.vote(postId, (resp) => {
        if (resp) {
            loadPosts();
        }
    });
}

function addUnvoteHandler(postId) {
    apiClient.unvote(postId, (resp) => {
        if (resp) {
            loadPosts();
        }
    });
}