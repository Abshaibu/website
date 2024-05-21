import Logo from '../../assets/Juiceme_Logo.svg'
import Menu from '../../assets/menu.svg'
import Flag1 from '../../assets/flag_1.svg'
import Flag2 from "../../assets/flag_2.svg";
import Flag3 from "../../assets/flag_3.svg";
import Flag4 from "../../assets/flag_4.svg";
// import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const countries = [
  { title: "Nigeria", flag: Flag4 },
  { title: "Eswatini", flag: Flag1, comingSoon: true },
  { title: "Uganda", flag: Flag2, comingSoon: true },
  { title: "Usa", flag: Flag3, comingSoon: true }
];

const headerLinks = ['employer', 'employee', 'about']

export default function Navbar({ link, handleLink }) {
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [showMobileNav, setShowMobileNav] = useState(false);
  // useEffect(() => {
  //   const menu = document.querySelector('.navbar-right ')
  //   menu.classList.toggle('active')
  //   window.scrollTo(0, 0)

  // }, [link])

  const toggleMenu = () => {
    const menu = document.querySelector('.navbar-right ')
    menu.classList.toggle('active')
    window.scrollTo(0, 0)
  }

  return (
    <header className="flex items-center">
      <div className="container">
        <a onClick={() => {
      setShowMobileNav(false);
      handleLink("home");
        }} href="#home">
          {" "}
          <img src={Logo} alt="logo" />
        </a>
        <nav className={showMobileNav ? "showNav" : null}>
          <ul>
            {headerLinks.map((item, i) => (
              <li key={i}>
                <a href={`#${item}`} onClick={() => {
                setShowMobileNav(false);
                handleLink(item);
                }}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <div className="headerNavBtnContainer flex gap-8">
            <button
              className="getStartedBtn"
              type="button"
              onClick={() => handleLink("contact")}
            >
              get started
            </button>
            <div className="relative flex gap-4">
              <button
                aria-label="country dropdown button"
                onClick={() =>
                  setShowCountryDropdown((prevState) => !prevState)
                }
                className="flagBtn flex items-center justify-center bg-[#FEEBE3]"
                type="button"
              >
                <img src={Flag4} alt="Nigeria logo" />
              </button>
              <ul
                className={`countryDropdown py-4 bg-white px-4 absolute right-0 border border-[#EDEDED] items-start flex flex-col ${
                  showCountryDropdown ? "show" : null
                }`}
              >
                {countries.map(({ title, flag, comingSoon }) => (
                  <li
                    className={`flex gap-2 items-center ${
                      comingSoon ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                    key={title}
                  >
                    <img className="md:block hidden" src={flag} alt={title} />
                    <p>{title}</p>
                    {comingSoon && (
                      <span className="bg-primary p-1 text-white text-[0.75rem] font-medium rounded-[4px]">
                        Coming Soon
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
        <button
          className="hidden"
          type="button"
          onClick={() => setShowMobileNav(prevState => !prevState)}
        >
          <img
            src={Menu}
            alt="Menu Logo"
            onClick={() => toggleMenu()}
          />
        </button>
      </div>
    </header>
  );
}
