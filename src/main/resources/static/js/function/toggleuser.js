class ToggleService {
    static #instance = null;
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new ToggleService();
        }
        return this.#instance;
    }

    header() {
        const header = document.querySelector(".header")

        header.innerHTML = `
        <div class="header-top">
            <div>
                <button class="toggle-button">
                    <i class="fa-solid fa-bars"></i>
                </button>
            </div>

            <a href="/index" class="logo-button">
                <h1>kakao<span>emoticon</span> shop</h1>
            </a>

            <button class="search-button">
                <i class="fa-solid fa-magnifying-glass"></i>
            </button>

            <button class="mypage-button">
            </button>
        </div>

        <nav class="header-menu">
            <ul class="menu-list">
                <li class="menu-list-button"><a href="/index">홈</a></li>
                <li class="menu-list-button"><a href="/main/new">신규</a></liu>
                <li class="menu-list-button"><a href="/main/hot">인기</a></li>
            </ul>
        </nav>
        `
    }

    loadlogin() {
        const menuAside = document.querySelector(".menu-aside");
        const principal = PrincipalApi.getInstance().getPrincipal();

        menuAside.innerHTML = `
                ${principal == null
                ? `
                    <div class="mypage-login">
                        <div class="profile-box">
                            <a href="/account/login" class="link-profile">
                                <div class="profile-img">
                                    <img class="user-profile" src="https://t1.kakaocdn.net/estoreweb/images/20220905161229/profile_default.png" alt="사용자">
                                </div>
                                <span class="login">로그인></span>
                            </a>
                        </div>
                        <div class="mypage-info">
                            <ul class="mypage-box">
                            
                                <li class="mypage-style">
                                    <a href="" class="mypage-link"></a>
                                        <i class="fa-regular fa-face-kiss-wink-heart"></i>
                                    <p class="mypage-chart">좋아요</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <ul class="abc">
                            <li class="abc-li">
                                <a href="/index" class="mypage-buttons">홈</a>
                            </li>
                            <li class="abc-li">
                                <a href="/main/new" class="mypage-buttons">신규</a>
                            </li>
                            <li class="abc-li">
                                <a href="/main/hot" class="mypage-buttons">인기</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul class="abcd">
                            <li class="nqp-inform">
                                <a href="https://e.kakao.com/notices" class="nqp-link">새소식</a>
                            </li>
                            <li class="abcd-a">
                                <a href="https://e.kakao.com/faq" class="nqp-link">자주묻는 질문</a>
                            </li>
                            <li class="abcd-a">
                                <a href="https://e.kakao.com/number" class="nqp-link">이모티콘 일련번호 입력하기</a>
                            </li>
                        </ul>
                    </div>
                    <div class="company-footer">
                        <div>
                            <a href="" class="company-link">
                                <span class="company-kakao">kakao</span><span class="company-emoticon">emoticon</span><span class="company-shop">shop</span>
                            </a>
                        </div>
                        <div>
                            <a href="https://www.kakaocorp.com" class="company-link2">@ kakao Corp</a>
                        </div>
                    </div>
                `


                : `
                    <div class="mypage-login">
                        <div class="profile-box">
                            <div class="link-profile">
                                <div class="profile-img">
                                    <img class="user-profile" src="https://t1.kakaocdn.net/estoreweb/images/20220905161229/profile_default.png" alt="사용자">
                                </div>
                                <span class="login">${principal.user.name}</span>
                                <span class="login">${principal.user.email}</span>
                            </div>
                        </div>
                        <div class="mypage-info">
                            <ul class="mypage-box">
       
                                <li class="mypage-style">
                                    <a href="/account/mypage" class="mypage-link">
                                    <i class="fa-regular fa-face-kiss-wink-heart login-heart"></i>
                                        <p class="mypage-chart">좋아요</p>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <ul class="abc">
                            <li class="abc-li">
                                <a href="/index" class="mypage-buttons">홈</a>
                            </li>
                            <li class="abc-li">
                                <a href="/main/newemoticon" class="mypage-buttons">신규</a>
                            </li>
                            <li class="abc-li">
                                <a href="/main/hot" class="mypage-buttons">인기</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul class="abcd">
                            <li class="nqp-inform">
                                <a href="https://e.kakao.com/notices" class="nqp-link">새소식</a>
                            </li>
                            <li class="abcd-a">
                                <a href="https://e.kakao.com/faq" class="nqp-link">자주묻는 질문</a>
                            </li>
                            <li class="abcd-a">
                                <a href="https://e.kakao.com/number" class="nqp-link">이모티콘 일련번호 입력하기</a>
                            </li>
                            <li class="abcd-d">
                                <a href="/logout" class="nqp-link">로그아웃 하기</a>
                            </li>
                        </ul>
                    </div>
                    <div class="company-footer">
                        <div>
                            <a href="" class="company-link">
                                <span class="company-kakao">kakao</span><span class="company-emoticon">emoticon</span><span class="company-shop">shop</span>
                            </a>
                        </div>
                        <div>
                            <a href="https://www.kakaocorp.com" class="company-link2">@ kakao Corp</a>
                        </div>
                    </div>
                
                    `
            }
                </ul>
        `;
    }

    footer() {
        const footer = document.querySelector(".footer");

        footer.innerHTML = `
        <div class="info">
            <h3 class="searvice-info">
                <a href="">이용약관</a>
                <a href="">유료이용안내</a>
                <a href="">개인정보처리방침</a>
                <a href="">기업고객</a>
                <a href="">문의하기</a>
                <a href="">공정위사업자정보</a>
                <a href="">(주) 카카오</a>
            </h3>
            <h4 class="warp-info">
                카카오 이모티콘샵에서 판매되는 콘텐츠의 저작권은 콘텐츠 제공자에게 있으며, 이를 무단 이용하는 경우 저작권법 등에 따라 처벌될 수 있습니다.
                <br />
                <br />
                대표: 홍은택 사업자등록번호: 120-81-47521 통신판매업신고번호: 제2015-제주아라-0032호
                <br />
                주소: 제주특별자치도 제주시 첨단로 242(영평동) 호스팅사업자: (주)카카오고객센터 1577-3754 메일: help.notice@kakaocorp.com
            </h4>
        </div>
        `
    }

}

class ToggleButton {
    static #instance = null;
    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new ToggleButton();
        }
        return this.#instance;
    }


    toggleButton() {
        const asideBlank = document.querySelector(".aside-blank");
        const asideContainer = document.querySelector(".aside-container");
        const toggleButton = document.querySelector(".toggle-button");

        toggleButton.onclick = () => {
            asideContainer.classList.remove("aside-hide");
        }

        asideBlank.onclick = () => {
            asideContainer.classList.add("aside-hide");
        }
    }


    logoutButton() {
        const mypageButton = document.querySelector(".mypage-button");
        const principal = PrincipalApi.getInstance().getPrincipal();

        mypageButton.onclick = () => {
            if (principal != null) {
                if (confirm("로그아웃하시겠습니까?")) {
                    
                    location.href = "/logout"
                } else {
                   
                }
            } else {
                location.href = "/account/login"
            }
        }

        mypageButton.innerHTML = `
        ${principal == null
                ? `
                <a href="/account/login">
                <img src="/static/images/profile_default.png" alt="">
                </a>
                `
                : `
                <a href="" class="logout"><img src = "https://www.iconpacks.net/icons/2/free-user-logout-icon-3056-thumb.png"></a>
                
        `

            }
    `
    }
    mypagLinkButton() {
        const mypageLink = document.querySelector(".fa-face-kiss-wink-heart");
        const principal = PrincipalApi.getInstance().getPrincipal();

        mypageLink.onclick = () => {
            if (principal == null) {
                if (confirm("로그인 후 사용 가능합니다")) {
                    location.href = "/account/login"
                }
            }
        }
    }
}