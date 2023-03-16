window.onload = () => {
    EmoModificationService.getInstance().setEmoCode()
    EmoModificationService.getInstance().loadEmoAndImageData()
    ComponentEvent.getInstance().addClickEventModificationButton()
    ComponentEvent.getInstance().addChangeEventImgFile()
    // ComponentEvent.getInstance().abcdefg()
    ComponentEvent.getInstance().addClickEventImgModificationButton()
}

const emoObj = {
    emoCode: "",
    emoName: "",
    company: "",
    emoDate: ""
}

const imgObj = {
    imageId: null,
    emoCode: null,
    saveName: null,
    originName: null
}

let imgList = null;

const deleteImgIdList = new Array();

const fileObj = {
    imageSeqs: new Array(),
    files: new Array(),
    formData: new FormData()
}

class EmoModificationApi {
    static #instance = null
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new EmoModificationApi()
        }
        return this.#instance
    }
    //이미지, 이모티콘 정보 들고오기 
    getEmoAndImage() {
        let responseData = null

        $.ajax({
            async: false,
            type: "get",
            url: `http://127.0.0.1:8000/api/admin/emos/${emoObj.emoCode}`,
            dataType: "json",
            success: response => {
                responseData = response.data
            },
            error: error => {
                console.log(error)
            }
        })
        return responseData
    }


    modifyEmo() {
        let successFlag = false

        $.ajax({
            async: false,
            type: "put",
            url: `http://127.0.0.1:8000/api/admin/emo/${emoObj.emoCode}`,
            contentType: "application/json",
            data: JSON.stringify(emoObj),
            dataType: "json",
            success: response => {
                successFlag = true
            },
            error: error => {
                console.log(error)
            }

        })

        return successFlag
    }

    removeImg(imageId) {
        let successFlag = false

        $.ajax({
            async: false,
            type: "delete",
            url: `http://127.0.0.1:8000/api/admin/emo/${emoObj.emoCode}/image/${imageId}`,
            dataType: "json",
            success: response => {
                console.log(imageId + "삭제완료")
                successFlag = true
            },
            error: error => {
                console.log(error)
            }

        })
        return successFlag
    }

    registerImg() {

        $.ajax({
            async: false,
            type: "post",
            url: `http://127.0.0.1:8000/api/admin/emo/${emoObj.emoCode}/images`,
            encType: "multipart/form-data",
            contentType: false,
            processData: false,
            data: fileObj.formData,
            dataType: "json",
            success: response => {
                alert("이모티콘 이미지 수정 완료.")
                location.reload()
            },
            error: error => {
                console.log(error)
            }

        })
    }
}


class EmoModificationService {
    static #instance = null
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new EmoModificationService();
        }
        return this.#instance
    }

    setEmoCode() {
        const URLSearch = new URLSearchParams(location.search)
        emoObj.emoCode = URLSearch.get("emoCode")
    }

    setEmoObjValues() {
        const modificationInputs = document.querySelectorAll(".modification-input")

        emoObj.emoCode = modificationInputs[0].value
        emoObj.emoName = modificationInputs[1].value
        emoObj.company = modificationInputs[2].value
        emoObj.emoDate = modificationInputs[3].value
    }

    //이미지, 데이터 로딩 
    loadEmoAndImageData() {
        const responseData = EmoModificationApi.getInstance().getEmoAndImage()

        if (responseData.emoMst == null) {
            alert("해당 이모티콘은 등록되지 않은 코드입니다")
            history.back()
            return
        }

        const modificationInputs = document.querySelectorAll(".modification-input")
        modificationInputs[0].value = responseData.emoMst.emoCode
        modificationInputs[1].value = responseData.emoMst.emoName
        modificationInputs[2].value = responseData.emoMst.company
        modificationInputs[3].value = responseData.emoMst.emoDate

        if (responseData.emoImage != null) {
            imgList = responseData.emoImage;
            console.log(imgList)
            const emoImg = document.querySelectorAll(".emo-img")
            
            responseData.emoImage.forEach((imgObj, index) => {
                emoImg[index].src = "http://127.0.0.1:8000/image/emo/" + imgObj.saveName;
            })
            
            
        }
    }


}

class ImgFileService {
    static #instance = null
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new ImgFileService();
        }
        return this.#instance
    }
 
    getImgPreview() {
        const emoImgs = document.querySelectorAll(".emo-img");
        console.log(fileObj.files)
        fileObj.files.forEach((imgFile, index) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                emoImgs[index].src = e.target.result;
            }

            reader.readAsDataURL(imgFile);
        });


    }

}

class ComponentEvent {
    static #instance = null
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new ComponentEvent()
        }
        return this.#instance
    }


    addClickEventModificationButton() {
        const modificationButton = document.querySelector(".modification-btn")

        modificationButton.onclick = () => {

            EmoModificationService.getInstance().setEmoObjValues();
            const successFlag = EmoModificationApi.getInstance().modifyEmo();
        }
    } 
    
    addChangeEventImgFile() {
        const imgAddButtons = document.querySelectorAll(".img-add-button");
        const imgFiles = document.querySelectorAll(".img-file");
    
        imgAddButtons.forEach((button, index) => {
            button.onclick = () => {
                imgFiles[index].click();
            }
        });
    
        imgFiles.forEach((imgFile, index) => {
            imgFile.onchange = () => {
                const formData = new FormData(document.querySelector(".img-form"));
                let changeFlag = false;
    
                formData.forEach((value, key) => {
                    if (imgFile.getAttribute("name") == key && value.size != 0) {
                        changeFlag = true;
                        fileObj.files[index] = value; // fileObj.files 배열에 파일 추가
                    }
                });
    
                if (changeFlag) {
                    if(!deleteImgIdList.includes(imgList[index].imageId)){
                        deleteImgIdList.push(imgList[index].imageId);
                    }
                    console.log(deleteImgIdList)
                    const imgRegisterButton = document.querySelector(".img-modification-button");
                    imgRegisterButton.disabled = false;
    
                    ImgFileService.getInstance().getImgPreview();
                    imgFile.value = null;
                }

            };
        });
    }
    
    addClickEventImgModificationButton() {
        const imgModificationButton = document.querySelector(".img-modification-button")

        imgModificationButton.onclick = () => {
            deleteImgIdList.forEach(imgId => {
                if(!EmoModificationApi.getInstance().removeImg(imgId)) {
                    alert("이미지 삭제 오류.");
                    location.reload();
                }
            });

            for (let i = 0; i < fileObj.files.length; i++) {
                fileObj.formData.append("files", fileObj.files[i]);
            }
            EmoModificationApi.getInstance().registerImg();
        }
    }

}