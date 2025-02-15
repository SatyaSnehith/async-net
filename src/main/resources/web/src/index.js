import {Nav} from "./nui/components";
import HomeScreen from "./home/home";

const body = document.getElementsByTagName('body')[0]

const mainNav = new Nav(body)


mainNav.screen = new HomeScreen()