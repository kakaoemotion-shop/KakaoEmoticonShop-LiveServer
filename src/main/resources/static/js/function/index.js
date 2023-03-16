window.onload = () => {
    ToggleService.getInstance().loadlogin();
    ToggleButton.getInstance().logoutButton();
    ToggleButton.getInstance().mypagLinkButton();
    ToggleButton.getInstance().toggleButton();
    ToggleService.getInstance().footer();
    
    MainPageService.getInstance().setMaxPage();
    MainPageService.getInstance().clearNewEmoList();
    MainPageService.getInstance().clearHotEmoList();
    MainPageService.getInstance().loadNewEmos();
    MainPageService.getInstance().loadHotEmos();
}