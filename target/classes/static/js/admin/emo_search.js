window.onload = () => {
    
    EmoService.getInstance().loadEmoList();

    ComponentEvent.getInstance().addClickEventSearchButton()
    ComponentEvent.getInstance().addClickEventDeleteCheckAll()
    ComponentEvent.getInstance().addClickEventDeleteButton()

}


let SearchObj = {
    page: 1,
    searchValue: "",
    order: "emoId",
    limit: "Y",
    count: 20
}

class EmoSearchApi {
    static #instance = null;
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new EmoSearchApi();
        }
        return this.#instance;
    }

    getEmoList(SearchObj) {
        let returnData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://127.0.0.1:8000/api/admin/emos",
            data: SearchObj,
            dataType: "json",
            success: response => {
                console.log(response);
                returnData = response.data;
            },
            error: error => {
                console.log(error);
            }
        })

        return returnData;
    }

    getEmoTotalCount(SearchObj) {
        let returnData = null

        $.ajax({
            async: false,
            type: "get",
            url: "http://127.0.0.1:8000/api/admin/emos/totalcount",
            data: {
                "searchValue": SearchObj.searchValue
            },
            dataType: "json",
            success: response => {
                console.log(response);
                returnData = response.data;
            },
            error: error => {
                console.log(error);
            }
        });

        return returnData;
    }


    deleteEmos(deleteArray) {
        let returnData = false;
        $.ajax({
            contentType: "application/json",
            async: false,
            type: "delete",
            data: JSON.stringify(
                { emoId: deleteArray }
            ),
            dataType: "json",
            url: "http://127.0.0.1:8000/api/admin/emos",
            success: response => {
                console.log(response);
                returnData = true;
            },
            error: error => {
                console.log(error);
            }

        })
        return returnData;
    }

}

class EmoService {
    static #instance = null;
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new EmoService();
        }
        return this.#instance;
    }

    loadEmoList() {
        const responseData = EmoSearchApi.getInstance().getEmoList(SearchObj);
        const totalCount = EmoSearchApi.getInstance().getEmoTotalCount(SearchObj);

        const emoListBody = document.querySelector(".search-table tbody");
        emoListBody.innerHTML = "";

        responseData.forEach((data) => {
            emoListBody.innerHTML += `
                <tr>
                    <td><input type="checkbox" class="delete-checkbox"></td>
                    <td class="emo-id">${data.emoId}</td>
                    <td>${data.emoCode}</td>
                    <td>${data.emoName}</td>
                    <td>${data.company}</td>
                    <td>${data.emoDate}</td>
                    <td><a href="/admin/modify?emoCode=${data.emoCode}"><i class="fa-solid fa-square-pen"></i></td>
                </tr>
            `;
        });


        const noSearchReult = document.querySelector(".search-group");

        if(totalCount == 0){
            noSearchReult.innerHTML += `
                <div class="no-search">
                    <img src="/static/images/no_search_result.png" class="emo-img"> 
                    <h2>검색결과가 없습니다.</h2>
                    <h3>다른검색어로 다시 시도해주세요</h3>
                </div>
            `;
        }

        this.loadSearchNumberList();

        ComponentEvent.getInstance().addClickEventDeleteCheckbox();
    }

    loadSearchNumberList() {
        const pageController = document.querySelector(".page-controller");

        const totalCount = EmoSearchApi.getInstance().getEmoTotalCount(SearchObj);
        const maxPageNumber = totalCount % SearchObj.count == 0
                            ? Math.floor(totalCount / SearchObj.count)
                            : Math.floor(totalCount / SearchObj.count) + 1

        pageController.innerHTML = `
            <a href="javascript:void(0)" class="pre-button disabled">이전</a>
            <ul class="page-numbers">
            </ul>
            <a href="javascript:void(0)" class="next-button disabled">다음</a>
        `;

        if (SearchObj.page != 1) {
            const preButton = pageController.querySelector(".pre-button");
            preButton.classList.remove("disabled");
            
            preButton.onclick = () => {
                SearchObj.page--;
                this.loadEmoList();
            }
        }

        if (SearchObj.page != maxPageNumber) {
            const nextButton = pageController.querySelector(".next-button");
            nextButton.classList.remove("disabled");

            nextButton.onclick = () => {
                SearchObj.page++;
                this.loadEmoList();
            }
        }

        const startIndex = SearchObj.page % 5 == 0
                        ? SearchObj.page - 4
                        : SearchObj.page - (SearchObj.page % 5) + 1;

        const endIndex = startIndex + 4 <= maxPageNumber ? startIndex + 4 : maxPageNumber;
        const pageNumbers = document.querySelector(".page-numbers");

        for (let i = startIndex; i <= endIndex; i++) {
            pageNumbers.innerHTML += `
                <a href="javascript:void(0)" class="page-button ${i == SearchObj.page ? "disabled" : ""}"><li>${i}</li></a>
            `;
        }

        const pageButtons = document.querySelectorAll(".page-button");
        pageButtons.forEach(button => {

            const pageNumber = button.textContent;
            if (pageNumber != SearchObj.page) {
                button.onclick = () => {
                    SearchObj.page = pageNumber;
                    this.loadEmoList();
                }
            }
        })
        
    }
}

class ComponentEvent {
    static #instance = null
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new ComponentEvent();
        }
        return this.#instance
    }

    addClickEventSearchButton() {
        const searchInput = document.querySelector(".search-bar")
        const searchButton = document.querySelector(".search-icon-btn")

        searchButton.onclick = () => {
            SearchObj.searchValue = searchInput.value;
            SearchObj.page = 1;
            EmoService.getInstance().loadEmoList();
        }

        searchInput.onkeyup = () => {
            if (window.event.keyCode == 13) {
                searchButton.click();
            }
        }

    }

    addClickEventDeleteButton() {
        const deleteButton = document.querySelector(".delete-button")

        deleteButton.onclick = () => {
            if (confirm("정말로 삭제하시겠습니까?")) {
                const deleteArray = new Array();

                const deleteCheckboxs = document.querySelectorAll(".delete-checkbox")
                deleteCheckboxs.forEach((deleteCheckboxs, index) => {
                    if (deleteCheckboxs.checked) {
                        const emoId = document.querySelectorAll(".emo-id")
                        deleteArray.push(emoId[index].textContent)
                    }
                });
                
                EmoSearchApi.getInstance().deleteEmos(deleteArray)
            }
        }
    }


    addClickEventDeleteCheckAll() {
        const checkAll = document.querySelector(".delete-checkall")
        checkAll.onclick = () => {
            const deleteCheckboxs = document.querySelectorAll(".delete-checkbox")
            deleteCheckboxs.forEach(deleteCheckboxs => {
                deleteCheckboxs.checked = checkAll.checked;

            });
        }
    }

    addClickEventDeleteCheckbox() {
        const deleteCheckboxs = document.querySelectorAll(".delete-checkbox")

        const checkAll = document.querySelector(".delete-checkall")

        deleteCheckboxs.forEach(deleteCheckbox => {
            deleteCheckbox.onclick = () => {
                const deleteCheckedcheckboxs = document.querySelectorAll(".delete-checkbox:checked")
                if (deleteCheckedcheckboxs.length == deleteCheckboxs.length) {
                    checkAll.checked = true;
                } else {
                    checkAll.checked = false;
                }
            }
        });
    }
}   