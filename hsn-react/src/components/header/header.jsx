import HeaderMainContainer from "./header-main-container/header-main-container";
import HeaderTopMain from "./header-top-main/header-top-main";
import HeaderTopPageAlert from "./header-top-page-alert/header-top-page-alert";
import Navigation from "./navigation/navigation";

export default function Header() {
  return (
    <header>
      <HeaderTopMain />
      <HeaderMainContainer />
      <Navigation />
      <HeaderTopPageAlert />
    </header>
  );
}
