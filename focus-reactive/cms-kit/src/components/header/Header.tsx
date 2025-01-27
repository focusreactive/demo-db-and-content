'use client';

import React, { useState } from 'react';
import { useSpring, animated, config } from 'react-spring';
import Logo from '../common/logo/Logo';
import { styled } from '@linaria/react';
import Buttons from '../common/buttons/Buttons';
import { appTheme } from '../../theme';
import useScrollListener from '../../hooks/useScroll';
import { getUniqElements } from '../../utils/arrayUtils';
import HeaderNav from './HeaderNav';
import HeaderNavMobile from './HeaderMobileNav';
import { StyledContainer } from '../section/Section';
import { converters } from '../../cms-connector/converters';

const CustomButtons = styled(Buttons)`
  & > * {
    margin-top: 0;
    margin-right: 15px;

    &:last-child {
      margin-right: 0;
    }
  }
`;

const LogoLink = styled.a`
  display: flex;
  align-items: center;
  height: 40px;
  width: 128px;
  flex: 0 0 auto;

  ${appTheme.media.md} {
    width: 166px;
    margin-right: 50px;
  }
`;

const HeaderBox = styled.header<{ bgColor: keyof typeof appTheme.colors }>`
  background: ${({ bgColor }) => appTheme.colors[bgColor]};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 11;

  &[data-fixed='true'] {
    position: fixed;
    top: 0;
    transition: background-color 0.5s ease;
  }

  & > #header-container {
    position: relative;
    padding: 20px;
    margin: 0 auto;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-shrink: 1;

    ${appTheme.media.md} {
      padding: 30px 20px;
    }

    ${appTheme.media.lg} {
      padding: 44px 20px;
    }
  }
`;

const HeaderGroup = styled.div`
  flex: 1 1;
  justify-content: flex-end;
  display: none;

  ${appTheme.media.lg} {
    display: flex;
  }
`;

const HeadMenu = styled.ul`
  display: flex;
  flex: 1 1;
  justify-content: space-evenly;
  list-style: none;
  font-weight: 500;
  z-index: 2;

  li {
    margin: 0;
  }
`;

const Hamburger = styled.button<{ burgerColor?: string }>`
  position: absolute;
  right: 10px;
  top: 9px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  cursor: pointer;
  background: transparent;

  ${appTheme.media.md} {
    top: 30px;
    width: 40px;
    height: 40px;
  }

  ${appTheme.media.lg} {
    display: none;
  }

  &:hover {
    opacity: 1;

    span {
      :nth-child(n + 1):after {
        width: 100%;
      }
    }
  }

  span {
    display: flex;
    width: 24px;
    height: 2px;

    ${appTheme.media.md} {
      height: 3px;
      width: 30px;
    }

    :after {
      content: '';
      width: 100%;
      height: 100%;
      background: ${({ burgerColor }) => (burgerColor ? burgerColor : 'none')};
      border-radius: 3px;
      transition: all ease 0.1s;
    }

    :nth-child(1) {
      &:after {
        width: 100%;
      }
    }
    :nth-child(2) {
      margin: 3px 0;

      ${appTheme.media.md} {
        margin: 5px 0;
      }

      &:after {
        width: 75%;
      }
    }
    :nth-child(3) {
      &:after {
        width: 50%;
      }
    }
  }
`;

const MenuLinkContainer = styled.span<{ isActive: boolean }>`
  color: ${({ isActive }) => (isActive ? 'white' : '#25374c')};
  position: relative;
  display: flex;
  height: 40px;
  flex-wrap: nowrap;
  align-items: center;
  padding: 0 10px;
  cursor: default;
`;

const MenuItem = ({ text, isActive, isAllActive, color, ...restProps }: any) => {
  return (
    <li>
      <MenuLinkContainer {...restProps} isActive={isActive || !isAllActive}>
        {text}
      </MenuLinkContainer>
    </li>
  );
};

const circleSize = 200;
const circleOffset = 70;

const BigCircle = styled.div`
  position: fixed;
  width: ${circleSize}px;
  height: ${circleSize}px;
  border-radius: 100%;
  background-color: ${appTheme.colors.blue700};
`;

const HeaderNavBoxWrapper = styled.div`
  perspective: 100vw;
  perspective-origin: top;
`;

const StyledWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
`;

const StyledLayout = styled.div`
  position: relative;
  width: 100%;
`;

const COLORS = {
  default: {
    burgerColor: 'white',
  },
  white: {
    burgerColor: '#333333',
  },
  gray100: {
    burgerColor: '#333333',
  },
};

export const HeaderComponent = ({
  menu = [],
  buttons = [],
  buttonsColor,
  linksColor,
  ctaCard,
  contacts,
  heroBackgroundColor,
  isFixed,
}: {
  menu: any[];
  buttons: {}[];
  isFixed: boolean;
  buttonsColor: string;
  linksColor: string;
  heroBackgroundColor: keyof typeof COLORS;
  ctaCard: any;
  contacts: any;
}) => {
  const { burgerColor } = COLORS[heroBackgroundColor] || COLORS.default;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const groups = getUniqElements(
    (menu || []).reduce((result: any, cur: any) => {
      return [...result, cur.group];
    }, []),
  );

  const [activeTab, setActiveTab] = useState(null);

  const currentNavigationElements = (menu || []).filter((item: any) => item.group === activeTab);

  const correctColors = {
    buttonsColor: activeTab ? 'blue400' : buttonsColor,
    linksColor: activeTab ? 'blue700' : linksColor,
    heroBackgroundColor: activeTab ? 'white' : heroBackgroundColor,
    headerBoxBackgroundColor: activeTab ? 'white' : 'blue400',
  };

  const updatedButtons = [
    {
      ...buttons[0],
      color: 'white',
      background: correctColors.buttonsColor,
      variant: activeTab ? 'blue' : 'white',
    },
    {
      ...buttons[1],
      color: correctColors.buttonsColor,
      borderColor: correctColors.buttonsColor,
      background: null,
      variant: activeTab ? 'blue' : 'bordered',
    },
  ];

  const [animStyles, animApi] = useSpring(() => ({
    top: -circleSize,
    left: 'initial',
    opacity: 0,
    config: config.gentle,
  }));

  const menuItemHandler = ({ currentTarget, item }: any) => {
    setActiveTab(item);

    const bounding = currentTarget.getBoundingClientRect();

    const { left, top, width, height } = bounding;
    const x = left + width / 2 - circleSize / 2;
    const y = top + height / 2 - circleSize / 2 - circleOffset;

    // @ts-ignore
    animApi.start(() => ({ left: x, top: y, opacity: 1 }));
  };

  const headerNavWrapperStyles = useSpring({
    position: 'relative',
    opacity: activeTab ? 1 : 0,
    transform: activeTab ? 'translateY(0px) rotateX(0deg)' : 'translateY(-20px) rotateX(-20deg)',
  });

  const outHandler = () => {
    setActiveTab(null);
    animApi.start({
      top: -circleSize,
      opacity: 0,
    });
  };

  useScrollListener(outHandler);

  let heroBoxColor = activeTab ? 'white' : null;
  if (isFixed) {
    heroBoxColor = 'white';
  }

  return (
    <StyledLayout>
      <StyledWrapper>
        <HeaderNavMobile
          menu={menu}
          buttons={buttons.length ? [{ ...updatedButtons[0], variant: 'blue' }] : []}
          contacts={contacts}
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          bgColor={correctColors.heroBackgroundColor}
        />
        <HeaderBox
          onMouseLeave={outHandler}
          data-fixed={isFixed}
          bgColor={correctColors.headerBoxBackgroundColor as keyof typeof appTheme.colors}
        >
          <StyledContainer id="header-container" style={{ zIndex: 2 }}>
            <LogoLink href={'/'}>
              <Logo bgColor={isFixed ? 'white' : correctColors.heroBackgroundColor} />
            </LogoLink>

            <HeaderGroup>
              <BigCircle as={animated.div} style={animStyles as any} />
              <HeadMenu>
                {menu.map((item, key) => (
                  <MenuItem
                    text={item.group}
                    key={key}
                    color={correctColors.linksColor}
                    onMouseEnter={({ currentTarget }: any) => {
                      menuItemHandler({ currentTarget, item: item.group });
                    }}
                    isAllActive={Boolean(activeTab)}
                    isActive={activeTab === item.group}
                  />
                ))}
              </HeadMenu>
              <CustomButtons buttons={buttons.length ? updatedButtons : []} buttonsColor={correctColors.buttonsColor} />
            </HeaderGroup>
            <Hamburger burgerColor={burgerColor} onClick={() => setIsMobileMenuOpen(true)} aria-label="burger menu">
              <span />
              <span />
              <span />
            </Hamburger>
          </StyledContainer>
          {activeTab ? (
            <HeaderNavBoxWrapper onClick={outHandler}>
              <animated.div style={headerNavWrapperStyles as any}>
                <HeaderNav promo={ctaCard} navigation={currentNavigationElements} />
              </animated.div>
            </HeaderNavBoxWrapper>
          ) : null}
        </HeaderBox>
      </StyledWrapper>
    </StyledLayout>
  );
};

export const Header = (props: any) => {
  const convertedProps = headerPropsConverter.sanity(props);

  if (convertedProps === null) return null;

  return <HeaderComponent {...(convertedProps as any)} />;
};

export const headerPropsConverter = {
  sanity: (block: any) => {
    const { ctaCard, menu, ...rest } = block;

    if (!rest._id) {
      return null;
    }

    return {
      ...rest,
      ctaCard: {
        ...ctaCard,
        image: converters.imageWithAlt(ctaCard.imageWithAlt),
        title: converters.title(ctaCard.title),
      },
      menu: menu.map((v: any) => ({
        ...v,
        links: v.links.map((link: any) => ({
          ...link,
          title: converters.title(link.title),
          description: converters.richText(link.description),
          imageWithAlt: converters.imageWithAlt(link.imageWithAlt),
        })),
      })),
    };
  },
};
