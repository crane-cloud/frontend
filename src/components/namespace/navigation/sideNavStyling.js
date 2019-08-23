import styled from 'styled-components';
import SideNav, {
    Nav,
    NavItem,
    NavIcon,
    NavText
} from '@trendmicro/react-sidenav';

// SideNav
const StyledSideNav = styled(SideNav)`
    background-color: #0786ed;
    border-right: 1px solid #ddd;
`;
StyledSideNav.defaultProps = SideNav.defaultProps;

// Nav
const StyledNav = styled(Nav)`
    background-color: #0786ed;

    &&[class*="expanded--"] {
        [class*="sidenav-subnav--"] {
            > [class*="sidenav-subnavitem--"],
            > [class*="sidenav-subnavitem--"]:hover {
                > [class*="navitem--"] {
                    color: #d1cfcf;
                }
            }
            > [class*="sidenav-subnavitem--"]:hover {
                > [class*="navitem--"] {
                    background-color: #1260a3;
                }
            }
            > [class*="sidenav-subnavitem--"][class*="selected--"] {
                > [class*="navitem--"] {
                    color: #fff;
                }
                > [class*="navitem--"]::before {
                    border-left: 2px solid #db3d44;
                }
            }
        }
    }

    && > [class*="sidenav-navitem--"] {
        > [class*="navitem--"] {
            background-color: #0786ed;
            color: #fff;
        }
    }
    && > [class*="sidenav-navitem--"]:hover {
        > [class*="navitem--"] {
            background-color: #1260a3;
        }
    }
    && > [class*="sidenav-navitem--"],
    && > [class*="sidenav-navitem--"]:hover {
        > [class*="navitem--"] {
            [class*="navicon--"] {
                &, > * {
                    color: #a6a4a4;
                }
            }
            [class*="sidenav-nav-text--"] {
                &, > * {
                    color: #fff;
                }
            }
        }
    }

    && > [class*="sidenav-navitem--"][class*="highlighted--"],
    && > [class*="sidenav-navitem--"][class*="highlighted--"]:hover {
        > [class*="navitem--"] {
            [class*="navicon--"],
            [class*="navtext--"] {
                &, > * {
                    color: #fff;
                }
            }
            [class*="sidenav-nav-text--"] {
                font-weight: 700;
            }
        }
    }
`;
StyledNav.defaultProps = Nav.defaultProps;

// NavItem
const StyledNavItem = styled(NavItem)`
    &&&:hover {
        [class*="navtext--"] {
            color: #fff;
        }
    }
`;
StyledNavItem.defaultProps = NavItem.defaultProps;

// NavIcon
const StyledNavIcon = styled(NavIcon)`
    color: #222;
`;
StyledNavIcon.defaultProps = NavIcon.defaultProps;

// NavText
const StyledNavText = styled(NavText)`
    color: #d1cfcf;
`;
StyledNavText.defaultProps = NavText.defaultProps;

export {
    StyledNav as Nav,
    StyledNavItem as NavItem,
    StyledNavIcon as NavIcon,
    StyledNavText as NavText
};
export default StyledSideNav;