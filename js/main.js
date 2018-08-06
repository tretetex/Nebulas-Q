'use strict';

function updateInfo() {
    window.postMessage({
        "target": "contentscript",
        "data": {},
        "method": "getAccount",
    }, "*");

    apiClient.getMyPostsCount((resp) => {
        let count = resp.result || 0;
        document.querySelector("#questionsCount").innerHTML = count;
    });
    apiClient.getMyVotesCount((resp) => {
        let count = resp.result || 0;
        document.querySelector("#votesCount").innerHTML = count;
    });
}

function loadPosts(startFrom, count) {
    apiClient.getPosts(startFrom, count, function (resp) {
        if (resp.result) {
            document.querySelector(".posts").innerHTML = "<br><br><div style='color: #8a9098' class='d-flex justify-content-center'>Loading...</div>";
            let result = JSON.parse(resp.result);
            document.querySelector(".posts").innerHTML = "";

            if (result && result.length > 0) {
                result = result.reverse();

                for (const post of result) {
                    showPost(post);
                }
            } else {
                document.querySelector(".posts").innerHTML = "<br><br><div style='color: #8a9098' class='d-flex justify-content-center'>Not found :(</div>";
            }
        }
    });
}

function loadTopPosts() {
    apiClient.getTopPosts(function (resp) {
        if (resp && resp.result) {
            document.querySelector(".posts").innerHTML = "<br><br><div style='color: #8a9098' class='d-flex justify-content-center'>Loading...</div>";
            let result = JSON.parse(resp.result);
            document.querySelector(".posts").innerHTML = "";

            if (result && result.length > 0) {
                for (const post of result) {
                    showPost(post);
                }
            } else {
                document.querySelector(".posts").innerHTML = "<br><br><div style='color: #8a9098' class='d-flex justify-content-center'>Not found :(</div>";
            }
        }
    });
}

function loadMyPosts() {
    apiClient.getMyPosts(function (resp) {
        if (resp.result) {
            document.querySelector(".posts").innerHTML = "<br><br><div style='color: #8a9098' class='d-flex justify-content-center'>Loading...</div>";
            let result = JSON.parse(resp.result);
            document.querySelector(".posts").innerHTML = "";

            if (result && result.length > 0) {
                result = result.reverse();

                for (const post of result) {
                    showPost(post);
                }
            } else {
                document.querySelector(".posts").innerHTML = "<br><br><div style='color: #8a9098' class='d-flex justify-content-center'>Not found :(</div>";
            }
        }
    });
}

function loadMyVotes() {
    apiClient.getPostsVotedFromMe(function (resp) {
        if (resp.result) {
            console.warn(resp);
            document.querySelector(".posts").innerHTML = "<br><br><div style='color: #8a9098' class='d-flex justify-content-center'>Loading...</div>";
            let result = JSON.parse(resp.result);
            document.querySelector(".posts").innerHTML = "";

            if (result && result.length > 0) {
                result = result.reverse();

                for (const post of result) {
                    showPost(post);
                }
            } else {
                document.querySelector(".posts").innerHTML = "<br><br><div style='color: #8a9098' class='d-flex justify-content-center'>Not found :(</div>";
            }
        }
    });
}

function showPost(post) {
    let innerHtml = `<div class="post d-flex justify-content-between ml-auto mr-auto">
            <div id="postId" hidden>${post.id}</div>

            <div class="data">
                <div class="post-container">
                    <div class="message">
                        <div class="title">${post.title}</div>
                        <div class="d-flex">
                            <div class="from">added by <span>${post.wallet}</span></div>
                            <div class="created">${convertUnixStampToScreenDate(Date.parse(post.added))}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="votes d-flex flex-column align-items-center">
                <div class="vote-up" title="Vote up">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon-vote-up">
                        <use xlink:href="#vote-up-${post.id}">
                            <svg id="vote-up-${post.id}" viewBox="0 0 18 10" width="100%" height="100%">
                                <path d="M17.85 9.65c.1-.1.15-.25.15-.35 0-.15-.05-.25-.15-.35L9.8.4C9.65.2 9.35.05 9 .05c-.35 0-.65.15-.8.35L.15 8.95a.6.6 0 0 0 0 .7c.15.2.5.35.8.35h16.1c.35 0 .65-.15.8-.35z"
                                    fill-rule="evenodd"></path>
                            </svg>
                        </use>
                    </svg>
                </div>
                <div>${post.votes}</div>
                <div class="vote-down" title="Vote down">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon-vote-down">
                        <use xlink:href="#vote-down-${post.id}">
                            <svg id="vote-down-${post.id}" viewBox="0 0 18 10" width="100%" height="100%">
                                <path d="M17.85.35c.1.1.15.25.15.35 0 .15-.05.25-.15.35L9.8 9.6c-.15.2-.45.35-.8.35-.35 0-.65-.15-.8-.35L.15 1.05a.6.6 0 0 1 0-.7C.3.15.65 0 .95 0h16.1c.35 0 .65.15.8.35z"></path>
                            </svg>
                        </use>
                    </svg>
                </div>
            </div>
        </div>`;

    let container = document.querySelector(".posts");
    let div = document.createElement('div');
    div.innerHTML = innerHtml;
    div.firstChild.querySelector(".vote-up").onclick = () => addVoteHandler(post.id);
    div.firstChild.querySelector(".vote-down").onclick = () => addUnvoteHandler(post.id);

    container.append(div.firstChild);
}

/* ------------------------------ */

function showLoaders() {
    let loader = `<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>`;
    var elements = document.querySelectorAll(".loader");
    for (var item of elements) {
        item.innerHTML = loader;
    }
}

function hideLoaders() {
    var elements = document.querySelectorAll(".loader");
    for (var item of elements) {
        item.innerHTML = "";
    }
}