/*OBJECTOS*/
class Post {
    constructor(id, title, text, tag, date) {
        this.comentId = 0;
        this.likeCounter = 0;
        this.dislikeCounter = 0;
        if (title === '') {
            throw new PostException("O campo 'Título' deve ser preenchido.");
        }
        if (text === '') {
            throw new PostException("O campo 'Escreve algo...' deve ser preenchido.");
        }
        if (tag !== '' && !tag.includes('#')) {
            throw new PostException("O campo 'tag' deve ser preenchido com # entre cada palavra");
        }
        this.id = id;
        this.title = title;
        this.text = text;
        this.tag = tag;
        this.date = date;
        this.comentList = [];
    }
    timeStamp() {
        let year = this.date.getFullYear();
        let month = this.date.getMonth() + 1;
        let day = this.date.getDate();
        let hour = this.date.getHours();
        let minute = this.date.getMinutes();
        return `${day}/${month}/${year}` + ` ` + `${hour}:${minute}`;
    }
    listTags() {
        let tagList = this.tag.split("#");
        tagList = tagList.filter(item => item);
        return tagList;
    }
    comentIdIteration() {
        this.comentId++;
        return this.comentId;
    }
    likeCounterIteration() {
        this.likeCounter++;
        return this.likeCounter;
    }
    dislikeCounterIteration() {
        this.dislikeCounter++;
        return this.dislikeCounter;
    }
}
class PostException {
    constructor(message) {
        this.message = message;
    }
}
class Coment {
    constructor(id, text) {
        this.likeCounter = 0;
        this.dislikeCounter = 0;
        if (text === '') {
            throw new ComentException("O campo de texto do comentário tem de ser preenchido.");
        }
        this.id = id;
        this.text = text;
    }
    likeCounterIteration() {
        this.likeCounter++;
        return this.likeCounter;
    }
    dislikeCounterIteration() {
        this.dislikeCounter++;
        return this.dislikeCounter;
    }
}
class ComentException {
    constructor(message) {
        this.message = message;
    }
}
/*VARIAVEIS/CONSTANTES GLOBAIS*/
const postList = [];
const tagList = new Set();
let idGlobal = 1;
/*STORAGE*/
function updateStorage() {
    if (typeof (Storage) !== "undefined") {
        localStorage.setItem("postList", JSON.stringify(postList));
        localStorage.setItem("tagList", JSON.stringify(tagList));
        localStorage.setItem("idGlobal", JSON.stringify(idGlobal));
    }
    else {
        alert("Storage Indisponìvel");
    }
}
/*Ainda tentei trabalhar na parte da persistência mas não consegui ir buscar os valores ao "servidor". Deixei o código aqui para receber algum feedback para
ver se o meu raciocinio estava certo.

function loadPost() {
    if (typeof(Storage) !== "undefined") {

        if (localStorage.postList) {
            let list : Post[] = JSON.parse(localStorage.getItem("postList"));

            for (const post of list) {
                let newPost : Post = new Post(idGlobal, post.title, post.text, post.tag, post.date);
                postList.push(newPost);
            }
        }
    } else {
        alert("Storage Indisponìvel");
    }
}

function loadTagList() {
    if (typeof(Storage) !== "undefined") {

        if (localStorage.tagList) {
            let list : string[] = JSON.parse(localStorage.getItem("tagList"));

            addTags(list);
            addToTagSelect;

        }
    } else {
        alert("Storage Indisponìvel");
    }
}

function loadIdGlobal() {
    if (typeof(Storage) !== "undefined") {

        if (localStorage.idGlobal) {
            idGlobal = parseInt(localStorage.getItem("idGlobal"));
        }
    } else {
        alert("Storage Indisponìvel");
    }
}
*/
/*EVENT LISTENERS*/
const newPostBtn = document.getElementById("newPostBtn");
newPostBtn.addEventListener("click", addPost);
newPostBtn.addEventListener("click", refreshPostList);
const resetFilterBtn = document.getElementById("filterReset");
resetFilterBtn.addEventListener("click", refreshPostList);
eraseResetFilter;
resetFilterBtn.addEventListener("click", eraseResetFilter);
const sortByDateBtn = document.getElementById("sortDateBtn");
sortByDateBtn.addEventListener("click", refreshPostList);
const sortByLikeBtn = document.getElementById("sortLikeBtn");
sortByLikeBtn.addEventListener("click", sortByLike);
const sortByDislikeBtn = document.getElementById("sortDislikeBtn");
sortByDislikeBtn.addEventListener("click", sortByDislike);
const searchTitleBtn = document.getElementById("searchTitleBtn");
searchTitleBtn.addEventListener("click", filterByTitle);
const searchTagBtn = document.getElementById("searchTagBtn");
searchTagBtn.addEventListener("click", filterByTag);
const searchTimeIntervalBtn = document.getElementById("searchDateBtn");
searchTimeIntervalBtn.addEventListener("click", filterByTimeInterval);
function workAccordion(accordionElem) {
    function handlePanelClick(event) {
        showPanel(event.currentTarget);
    }
    function showPanel(panel) {
        let expandedPanel = accordionElem.querySelector(".active");
        if (expandedPanel) {
            expandedPanel.classList.remove("active");
        }
        panel.classList.add("active");
    }
    let allPanelElems = accordionElem.querySelectorAll(".panel");
    for (var i = 0; i < allPanelElems.length; i++) {
        allPanelElems[i].addEventListener("click", handlePanelClick);
    }
    showPanel(allPanelElems[0]);
}
workAccordion(document.getElementById("accordion"));
/*EVENT HANDLERS*/
function cleanForm() {
    document.getElementById("wTitle").value = "";
    document.getElementById("wPost").value = "";
    document.getElementById("wTags").value = "";
}
function hideForm() {
    document.getElementById("postTrigger").checked = false;
}
function refreshPostList() {
    let orderPostList = sortByDate();
    createHTML(orderPostList);
}
function eraseResetFilter() {
    let resetFilter = document.getElementById("filterReset");
    resetFilter.style.display = "none";
}
/*DOM HANDLERS*/
function createHTML(list) {
    let listOfPostsDiv = document.getElementById("listOfPosts");
    listOfPostsDiv.innerHTML = "";
    for (const post of list) {
        let divPost = document.createElement("div");
        divPost.className = "post";
        divPost.id = "post-" + post.id;
        let postTitle = document.createElement("h2");
        postTitle.innerHTML = post.title;
        divPost.appendChild(postTitle);
        let postText = document.createElement("span");
        postText.id = "postText-" + post.id;
        postText.className = "postText";
        postText.innerHTML = post.text;
        divPost.appendChild(postText);
        let postTags = document.createElement("p");
        postTags.className = "postTags";
        postTags.innerHTML = post.tag;
        divPost.appendChild(postTags);
        let postDate = document.createElement("p");
        postDate.className = "postDate";
        postDate.innerHTML = post.timeStamp();
        divPost.appendChild(postDate);
        let divBtn = document.createElement("div");
        divBtn.className = "btns";
        divBtn.id = "btns-" + post.id;
        let editBtn = document.createElement("a");
        editBtn.className = "editPostBtn";
        let editBtnStyle = document.createElement("i");
        editBtnStyle.id = "editPostBtn-" + post.id;
        editBtnStyle.className = "fas fa-edit fa-2x";
        editBtnStyle.addEventListener("click", function (e) {
            postTitle.setAttribute('contenteditable', 'true');
            postText.setAttribute('contenteditable', 'true');
            postTags.setAttribute('contenteditable', 'true');
            postTitle.className = "postTitleEdit";
            postText.className = "postTextEdit";
            postTags.className = "postTagsEdit";
            updateBtn.style.display = "inline-block";
        });
        editBtn.appendChild(editBtnStyle);
        divBtn.appendChild(editBtn);
        let updateBtn = document.createElement("a");
        updateBtn.className = "updatePostBtn";
        let updateBtnStyle = document.createElement("i");
        updateBtnStyle.id = "updatePostBtn-" + post.id;
        updateBtnStyle.className = "fas fa-sync fa-2x";
        updateBtnStyle.addEventListener("click", function (e) {
            let postId = e.target.id.split("-")[1];
            let updatedTitle = e.target.parentNode.parentNode.parentNode.querySelector("h2").innerHTML;
            let updatedText = e.target.parentNode.parentNode.parentNode.querySelector("span").innerHTML;
            let updatedTag = e.target.parentNode.parentNode.parentNode.querySelector("p").innerHTML;
            updateTitlePost(postId, updatedTitle);
            updateTextPost(postId, updatedText);
            updatePostTag(postId, updatedTag);
            refreshPostList();
        });
        updateBtn.appendChild(updateBtnStyle);
        divBtn.appendChild(updateBtn);
        let deleteBtn = document.createElement("a");
        deleteBtn.className = "deletePostBtn";
        let deleteBtnStyle = document.createElement("i");
        deleteBtnStyle.id = "deletePostBtn-" + post.id;
        deleteBtnStyle.className = "fas fa-trash fa-2x";
        deleteBtnStyle.addEventListener("click", function (e) {
            let postId = e.target.id.split("-")[1];
            deletePost(postId);
            refreshPostList();
        });
        deleteBtn.appendChild(deleteBtnStyle);
        divBtn.appendChild(deleteBtn);
        let likeCounter = document.createElement("span");
        likeCounter.id = "likeCounter-" + post.id;
        likeCounter.className = "likeCounter";
        likeCounter.innerHTML = `${post.likeCounter}`;
        divBtn.appendChild(likeCounter);
        let likeBtn = document.createElement("a");
        likeBtn.className = "likePostBtn";
        let likeBtnStyle = document.createElement("i");
        likeBtnStyle.id = "likePostBtn-" + post.id;
        likeBtnStyle.className = "far fa-heart fa-2x";
        likeBtnStyle.addEventListener("click", function () {
            likeCounter.innerHTML = `${post.likeCounterIteration()}`;
            updateStorage();
        });
        likeBtn.appendChild(likeBtnStyle);
        divBtn.appendChild(likeBtn);
        let dislikeCounter = document.createElement("span");
        dislikeCounter.id = "dislikeCounter-" + post.id;
        dislikeCounter.className = "dislikeCounter";
        dislikeCounter.innerHTML = `${post.dislikeCounter}`;
        divBtn.appendChild(dislikeCounter);
        let dislikeBtn = document.createElement("a");
        dislikeBtn.className = "dislikePostBtn";
        let dislikeBtnStyle = document.createElement("i");
        dislikeBtnStyle.id = "dislikePostBtn-" + post.id;
        dislikeBtnStyle.className = "fas fa-heart-broken fa-2x";
        dislikeBtnStyle.addEventListener("click", function () {
            dislikeCounter.innerHTML = `${post.dislikeCounterIteration()}`;
            updateStorage();
        });
        dislikeBtn.appendChild(dislikeBtnStyle);
        divBtn.appendChild(dislikeBtn);
        divPost.appendChild(divBtn);
        let comentList = document.createElement("div");
        comentList.className = "coments";
        comentList.id = "lisOfComents-" + post.id;
        let comentLabel = document.createElement("label");
        comentLabel.setAttribute("for", "comentTrigger-" + post.id);
        let comentLabelStyle = document.createElement("i");
        comentLabelStyle.className = "fas fa-comments fa-2x";
        comentLabel.appendChild(comentLabelStyle);
        comentList.appendChild(comentLabel);
        let comentTriger = document.createElement("input");
        comentTriger.setAttribute('type', 'checkbox');
        comentTriger.name = "comentTrigger";
        comentTriger.id = "comentTrigger-" + post.id;
        comentList.appendChild(comentTriger);
        let comentForm = document.createElement("div");
        comentForm.className = "comentForm";
        comentForm.id = "collapse";
        let comentText = document.createElement("input");
        comentText.setAttribute('type', 'text');
        comentText.placeholder = "Escreve o teu comentário...";
        comentText.name = "wComent";
        comentText.id = "wComent-" + post.id;
        comentForm.appendChild(comentText);
        let comentBtn = document.createElement("button");
        comentBtn.className = "comentBtn";
        let comentBtnStyle = document.createElement("i");
        comentBtnStyle.id = "comentBtn-" + post.id;
        comentBtnStyle.className = "far fa-plus-square fa-2x";
        comentBtnStyle.addEventListener("click", function (e) {
            let postId = e.target.id.split("-")[1];
            addComent(postId);
            refreshPostList();
        });
        comentBtn.appendChild(comentBtnStyle);
        comentForm.appendChild(comentBtn);
        comentList.appendChild(comentForm);
        const ul = document.createElement("ul");
        for (const coment of post.comentList) {
            let li = document.createElement("li");
            li.id = "coment-" + coment.id;
            let liText = document.createElement("span");
            liText.innerHTML = coment.text;
            let divcomentBtn = document.createElement("div");
            divcomentBtn.className = "comentBtns";
            divcomentBtn.id = "comenBtns-" + post.id;
            let cmntEditBtn = document.createElement("a");
            cmntEditBtn.className = "comentEditBtn";
            let cmntEditBtnStyle = document.createElement("i");
            cmntEditBtnStyle.id = "comentEditBtn-" + coment.id;
            cmntEditBtnStyle.className = "fas fa-edit";
            cmntEditBtnStyle.addEventListener("click", function (e) {
                liText.setAttribute('contenteditable', 'true');
                liText.className = "comentTextEdit";
                updateComentBtn.style.display = "inline-block";
            });
            cmntEditBtn.appendChild(cmntEditBtnStyle);
            divcomentBtn.appendChild(cmntEditBtn);
            let updateComentBtn = document.createElement("a");
            updateComentBtn.className = "updateComentBtn";
            let updateComentBtnStyle = document.createElement("i");
            updateComentBtnStyle.id = "updateComentBtn-" + coment.id;
            updateComentBtnStyle.className = "fas fa-sync";
            updateComentBtnStyle.addEventListener("click", function (e) {
                let postId = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector("div").id.split("-")[1];
                let comentId = e.target.id.split("-")[1];
                let updatedText = e.target.parentNode.parentNode.parentNode.querySelector("span").innerHTML;
                updateTextComent(postId, comentId, updatedText);
                refreshPostList();
            });
            updateComentBtn.appendChild(updateComentBtnStyle);
            divcomentBtn.appendChild(updateComentBtn);
            let cmntLikeCounter = document.createElement("span");
            cmntLikeCounter.id = "comentLikeCounter-" + post.id;
            cmntLikeCounter.className = "comentLikeCounter";
            cmntLikeCounter.innerHTML = `${coment.likeCounter}`;
            divcomentBtn.appendChild(cmntLikeCounter);
            let likeCmntBtn = document.createElement("a");
            likeCmntBtn.className = "likeComentBtn";
            let likeCmntBtnStyle = document.createElement("i");
            likeCmntBtnStyle.id = "likeComentBtn-" + post.id;
            likeCmntBtnStyle.className = "far fa-heart";
            likeCmntBtnStyle.addEventListener("click", function () {
                cmntLikeCounter.innerHTML = `${coment.likeCounterIteration()}`;
                updateStorage();
            });
            likeCmntBtn.appendChild(likeCmntBtnStyle);
            divcomentBtn.appendChild(likeCmntBtn);
            let cmntDislikeCounter = document.createElement("span");
            cmntDislikeCounter.id = "comentDislikeCounter-" + post.id;
            cmntDislikeCounter.className = "comentDislikeCounter";
            cmntDislikeCounter.innerHTML = `${coment.dislikeCounter}`;
            divcomentBtn.appendChild(cmntDislikeCounter);
            let dislikeCmntBtn = document.createElement("a");
            dislikeCmntBtn.className = "dislikeComentBtn";
            let dislikeCmntBtnStyle = document.createElement("i");
            dislikeCmntBtnStyle.id = "dislikeComentBtn-" + post.id;
            dislikeCmntBtnStyle.className = "fas fa-heart-broken";
            dislikeCmntBtnStyle.addEventListener("click", function () {
                cmntDislikeCounter.innerHTML = `${coment.dislikeCounterIteration()}`;
                updateStorage();
            });
            dislikeCmntBtn.appendChild(dislikeCmntBtnStyle);
            divcomentBtn.appendChild(dislikeCmntBtn);
            li.appendChild(liText);
            li.appendChild(divcomentBtn);
            ul.appendChild(li);
        }
        comentList.appendChild(ul);
        divPost.appendChild(comentList);
        listOfPostsDiv.appendChild(divPost);
    }
}
/*FUNÇÕES*/
function postData() {
    let title = document.getElementById("wTitle").value;
    let text = document.getElementById("wPost").value;
    let tag = document.getElementById("wTags").value;
    return { title, text, tag };
}
function comentData(postIdNum) {
    let text = null;
    let id = null;
    for (let i = 0; i != postList.length; i++) {
        let post = postList[i];
        if (post.id === postIdNum) {
            text = document.getElementById("wComent-" + postIdNum).value;
            if (text !== '') {
                id = post.comentIdIteration();
            }
        }
    }
    return { text, id };
}
function addPost() {
    let newData = postData();
    let date = new Date();
    let newPost = null;
    try {
        newPost = new Post(idGlobal, newData.title, newData.text, newData.tag, date);
    }
    catch (err) {
        if (err instanceof PostException)
            alert(err.message);
    }
    if (newPost) {
        idGlobal++;
        addTags(newPost.listTags());
        addToTagSelect();
        postList.push(newPost);
        cleanForm();
        hideForm();
        updateStorage();
    }
}
function addComent(postId) {
    let postIdNum = parseInt(postId);
    let newData = comentData(postIdNum);
    let newComent = null;
    try {
        newComent = new Coment(newData.id, newData.text);
    }
    catch (err) {
        if (err instanceof ComentException)
            alert(err.message);
    }
    console.log(newComent);
    if (newComent) {
        for (let i = 0; i != postList.length; i++) {
            let post = postList[i];
            if (post.id === postIdNum) {
                post.comentList.push(newComent);
                updateStorage();
            }
        }
    }
}
function addTags(list) {
    for (const tag of list) {
        tagList.add(tag);
        updateStorage();
        console.log(tagList);
    }
}
function addToTagSelect() {
    let filterTag = document.getElementById("tags");
    filterTag.innerHTML = "";
    for (const tag of tagList) {
        let optionTag = document.createElement("option");
        optionTag.value = `${tag}`;
        optionTag.innerHTML = `${tag}`;
        filterTag.appendChild(optionTag);
    }
}
function deletePost(postId) {
    let postIdNum = parseInt(postId);
    if (isNaN(postIdNum)) {
        console.log(`Parametro postId (${postId}) inválido`);
        return;
    }
    for (let i = 0; i != postList.length; i++) {
        let post = postList[i];
        if (post.id === postIdNum) {
            let removido = postList.splice(i, 1);
            updateStorage();
            return;
        }
    }
}
function sortByDate() {
    let sortedList = postList.sort((a, b) => {
        const dateA = a.date.getTime();
        const dateB = b.date.getTime();
        if (dateB > dateA) {
            return 1;
        }
        else if (dateB < dateA) {
            return -1;
        }
        return 0;
    });
    return sortedList;
}
function sortByLike() {
    let sortedList = postList.sort((a, b) => {
        const likesA = a.likeCounter;
        const likesB = b.likeCounter;
        if (likesB > likesA) {
            return 1;
        }
        else if (likesB < likesA) {
            return -1;
        }
        return 0;
    });
    createHTML(sortedList);
}
function sortByDislike() {
    let sortedList = postList.sort((a, b) => {
        const dislikesA = a.dislikeCounter;
        const dislikesB = b.dislikeCounter;
        if (dislikesB > dislikesA) {
            return 1;
        }
        else if (dislikesB < dislikesA) {
            return -1;
        }
        return 0;
    });
    createHTML(sortedList);
}
function filterByTitle() {
    let searchString = document.getElementById("sTitle").value;
    let searchLower = searchString.toLowerCase();
    let filteredList = null;
    if (typeof searchString !== 'string' || searchString.length === 0) {
        alert("O campo de texto do filtro tem de ser preenchido.");
        return;
    }
    filteredList = postList.filter(post => post.title.toLowerCase().indexOf(searchLower) >= 0);
    if (filteredList.length === 0) {
        alert("Não existem post's com o título escolhido.");
        return;
    }
    else {
        createHTML(filteredList);
        let resetFilter = document.getElementById("filterReset");
        resetFilter.style.display = "inline-block";
    }
    document.getElementById("sTitle").value = "";
}
function filterByTag() {
    let filterTag = document.getElementById("tags");
    let optionTag = filterTag.options[filterTag.selectedIndex].value;
    let filteredList = null;
    filteredList = postList.filter(post => post.tag.includes(optionTag));
    createHTML(filteredList);
    let resetFilter = document.getElementById("filterReset");
    resetFilter.style.display = "inline-block";
}
function filterByTimeInterval() {
    let startString = document.getElementById("sDateFirst").value;
    let endString = document.getElementById("sDateSecond").value;
    let startDate = new Date(startString).getTime();
    let endDate = new Date(endString).getTime();
    let filteredList = null;
    if (typeof startString !== 'string' || startString.length === 0 || typeof endString !== 'string' || endString.length === 0) {
        alert("O campo de texto do filtro tem de ser preenchido.");
        return;
    }
    filteredList = postList.filter(post => {
        let postDate = post.date.getTime();
        return (startDate < postDate && postDate < endDate);
    });
    if (filteredList.length === 0) {
        alert("Não existem post's dentro desta janela de tempo");
        return;
    }
    else {
        createHTML(filteredList);
        let resetFilter = document.getElementById("filterReset");
        resetFilter.style.display = "inline-block";
    }
    document.getElementById("sDateFirst").value = "";
    document.getElementById("sDateSecond").value = "";
}
function updateTitlePost(postId, updatedTitle) {
    let postIdNum = parseInt(postId);
    if (isNaN(postIdNum)) {
        console.log(`Parametro postId (${postId}) inválido`);
        return;
    }
    for (let i = 0; i != postList.length; i++) {
        let post = postList[i];
        if (post.id === postIdNum) {
            let update = updatedTitle;
            post.title = update;
            updateStorage();
            return;
        }
    }
}
function updateTextPost(postId, updatedText) {
    let postIdNum = parseInt(postId);
    if (isNaN(postIdNum)) {
        console.log(`Parametro postId (${postId}) inválido`);
        return;
    }
    for (let i = 0; i != postList.length; i++) {
        let post = postList[i];
        if (post.id === postIdNum) {
            let update = updatedText;
            post.text = update;
            updateStorage();
            return;
        }
    }
}
function updatePostTag(postId, updatedTag) {
    let postIdNum = parseInt(postId);
    if (isNaN(postIdNum)) {
        console.log(`Parametro postId (${postId}) inválido`);
        return;
    }
    for (let i = 0; i != postList.length; i++) {
        let post = postList[i];
        if (post.id === postIdNum) {
            let update = updatedTag;
            post.tag = update;
            addTags(post.listTags());
            addToTagSelect();
            updateStorage();
            return;
        }
    }
}
function updateTextComent(postId, comentId, updatedText) {
    let postIdNum = parseInt(postId);
    let comentIdNum = parseInt(comentId);
    if (isNaN(postIdNum)) {
        console.log(`Parametro postId (${postId}) inválido`);
        return;
    }
    if (isNaN(comentIdNum)) {
        console.log(`Parametro comentId (${postId}) inválido`);
        return;
    }
    for (let i = 0; i != postList.length; i++) {
        let post = postList[i];
        if (post.id === postIdNum) {
            for (let x = 0; x != post.comentList.length; x++) {
                let coment = post.comentList[x];
                if (coment.id === comentIdNum) {
                    let update = updatedText;
                    coment.text = update;
                    updateStorage();
                    return;
                }
            }
        }
    }
}
/*function init() {
    loadPost();
    loadTagList();
    loadIdGlobal();
}

init();*/ 
//# sourceMappingURL=main.js.map