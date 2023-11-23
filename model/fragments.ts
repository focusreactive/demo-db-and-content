export const getButtonsFragment = (fieldName = 'buttons') => {
  return `
      ${fieldName}[] {
        ...,
        "text": title,
      }
    `;
};

export const headerAndFooter = `
    header-> {
      ...,
      ${getButtonsFragment()},
      menu[] {
        ...,
        links[] {
          ...,
          "iconSrc": image.asset,
          "iconAlt": image.alt,
        }
      },
      ctaCard {
        ...,
        ${getButtonsFragment()},
        image {
          ...,
          "src": asset
        },
      }
    },
    footer-> {
      ...,
      ${getButtonsFragment()},
      menus[] {
        title,
        ${getButtonsFragment('list')},
      },
      ${getButtonsFragment('nav')}
    },
  `;
