export const Color = {
    TextColor: 'var(--text-color)',
    BgColor: 'var(--bg-color)',
    CardColor: 'var(--card-color)',
    BorderColor: 'var(--border-color)',
    DescriptionColor: 'var(--description-color)',
    FileColor: 'var(--file-color)',
    HoveredFileColor: 'var(--hovered-file-color)',
    FileInnerColor: 'var(--file-inner-color)',
}

export const Style = {
    CardBg: { backgroundColor: Color.CardColor },
    EmptyBg: { backgroundColor: '' },
    BorderRadius: (br) => { return { borderRadius: br } },
    Size: s => { return { height: s, width: s } },
    Height: h => { return { height: h } },
    Width: w => { return { width: w } },
    Pointer: { cursor: 'pointer' },
    Padding: (p) => { return { padding: p } },
    Margin: (m) => { return { margin: m } },
    TextColor: { color: Color.TextColor },
    Row: {
        display: 'flex',
        flexDirection: 'row',
    },
    Column: {
        display: 'flex',
        flexDirection: 'column',
    },
    Border: {
        borderWidth: '1px',
        borderColor: Color.BorderColor,
        borderStyle: 'solid',
    }
}

export const Icon = {
    icons: {
        sun: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 12.6364C11.0083 12.6364 12.6364 11.0083 12.6364 9.00001C12.6364 6.9917 11.0083 5.36365 9 5.36365C6.9917 5.36365 5.36364 6.9917 5.36364 9.00001C5.36364 11.0083 6.9917 12.6364 9 12.6364Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 1V2.45455" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 15.5455V17" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.34182 3.3418L4.37455 4.37452" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.6255 13.6254L14.6582 14.6582" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M1 9H2.45455" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.5455 9H17" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.34182 14.6582L4.37455 13.6254" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.6255 4.37452L14.6582 3.3418" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        moon: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 9.72072C16.8599 11.237 16.2908 12.682 15.3594 13.8867C14.428 15.0914 13.1728 16.0059 11.7406 16.5232C10.3084 17.0405 8.7585 17.1392 7.27225 16.8078C5.786 16.4764 4.42487 15.7286 3.34813 14.6519C2.27138 13.5751 1.52356 12.214 1.19216 10.7277C0.860763 9.2415 0.959498 7.6916 1.47681 6.25942C1.99413 4.82724 2.90862 3.572 4.1133 2.64059C5.31797 1.70918 6.76299 1.14012 8.27928 1C7.39154 2.20101 6.96435 3.68075 7.07542 5.1701C7.18648 6.65945 7.82842 8.05947 8.88447 9.11553C9.94053 10.1716 11.3405 10.8135 12.8299 10.9246C14.3192 11.0356 15.799 10.6085 17 9.72072Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        settings: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.99999 11.1818C10.205 11.1818 11.1818 10.205 11.1818 8.99999C11.1818 7.79501 10.205 6.81818 8.99999 6.81818C7.79501 6.81818 6.81818 7.79501 6.81818 8.99999C6.81818 10.205 7.79501 11.1818 8.99999 11.1818Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M14.3818 11.1818C14.285 11.4012 14.2561 11.6445 14.2989 11.8804C14.3417 12.1164 14.4542 12.3341 14.6218 12.5055L14.6655 12.5491C14.8007 12.6842 14.908 12.8446 14.9812 13.0212C15.0544 13.1978 15.0921 13.387 15.0921 13.5782C15.0921 13.7693 15.0544 13.9586 14.9812 14.1352C14.908 14.3118 14.8007 14.4722 14.6655 14.6073C14.5304 14.7425 14.3699 14.8498 14.1934 14.923C14.0168 14.9962 13.8275 15.0339 13.6364 15.0339C13.4452 15.0339 13.2559 14.9962 13.0794 14.923C12.9028 14.8498 12.7424 14.7425 12.6073 14.6073L12.5636 14.5636C12.3922 14.396 12.1745 14.2835 11.9386 14.2407C11.7027 14.1979 11.4594 14.2268 11.24 14.3236C11.0249 14.4158 10.8414 14.5689 10.7122 14.764C10.583 14.9591 10.5137 15.1878 10.5127 15.4218V15.5455C10.5127 15.9312 10.3595 16.3012 10.0867 16.574C9.81392 16.8468 9.44395 17 9.05818 17C8.67241 17 8.30244 16.8468 8.02966 16.574C7.75688 16.3012 7.60364 15.9312 7.60364 15.5455V15.48C7.59801 15.2393 7.52009 15.0058 7.38001 14.81C7.23993 14.6141 7.04417 14.4649 6.81818 14.3818C6.59882 14.285 6.3555 14.2561 6.11957 14.2989C5.88365 14.3417 5.66595 14.4542 5.49455 14.6218L5.45091 14.6655C5.31582 14.8007 5.1554 14.908 4.97882 14.9812C4.80224 15.0544 4.61297 15.0921 4.42182 15.0921C4.23067 15.0921 4.04139 15.0544 3.86481 14.9812C3.68824 14.908 3.52782 14.8007 3.39273 14.6655C3.25749 14.5304 3.1502 14.3699 3.077 14.1934C3.00381 14.0168 2.96613 13.8275 2.96613 13.6364C2.96613 13.4452 3.00381 13.2559 3.077 13.0794C3.1502 12.9028 3.25749 12.7424 3.39273 12.6073L3.43636 12.5636C3.60403 12.3922 3.7165 12.1745 3.75928 11.9386C3.80205 11.7027 3.77317 11.4594 3.67636 11.24C3.58417 11.0249 3.43109 10.8414 3.23597 10.7122C3.04085 10.583 2.81221 10.5137 2.57818 10.5127H2.45455C2.06878 10.5127 1.69881 10.3595 1.42603 10.0867C1.15325 9.81392 1 9.44395 1 9.05818C1 8.67241 1.15325 8.30244 1.42603 8.02966C1.69881 7.75688 2.06878 7.60364 2.45455 7.60364H2.52C2.76072 7.59801 2.99419 7.52009 3.19004 7.38001C3.38589 7.23993 3.53507 7.04417 3.61818 6.81818C3.71499 6.59882 3.74387 6.3555 3.70109 6.11957C3.65832 5.88365 3.54585 5.66595 3.37818 5.49455L3.33455 5.45091C3.19931 5.31582 3.09202 5.1554 3.01882 4.97882C2.94562 4.80224 2.90795 4.61297 2.90795 4.42182C2.90795 4.23067 2.94562 4.04139 3.01882 3.86481C3.09202 3.68824 3.19931 3.52782 3.33455 3.39273C3.46963 3.25749 3.63005 3.1502 3.80663 3.077C3.98321 3.00381 4.17249 2.96613 4.36364 2.96613C4.55479 2.96613 4.74406 3.00381 4.92064 3.077C5.09722 3.1502 5.25764 3.25749 5.39273 3.39273L5.43636 3.43636C5.60777 3.60403 5.82547 3.7165 6.06139 3.75928C6.29731 3.80205 6.54064 3.77317 6.76 3.67636H6.81818C7.03329 3.58417 7.21674 3.43109 7.34596 3.23597C7.47518 3.04085 7.54452 2.81221 7.54545 2.57818V2.45455C7.54545 2.06878 7.6987 1.69881 7.97148 1.42603C8.24426 1.15325 8.61423 1 9 1C9.38577 1 9.75574 1.15325 10.0285 1.42603C10.3013 1.69881 10.4545 2.06878 10.4545 2.45455V2.52C10.4555 2.75403 10.5248 2.98267 10.654 3.17779C10.7833 3.37291 10.9667 3.52599 11.1818 3.61818C11.4012 3.71499 11.6445 3.74387 11.8804 3.70109C12.1164 3.65832 12.3341 3.54585 12.5055 3.37818L12.5491 3.33455C12.6842 3.19931 12.8446 3.09202 13.0212 3.01882C13.1978 2.94562 13.387 2.90795 13.5782 2.90795C13.7693 2.90795 13.9586 2.94562 14.1352 3.01882C14.3118 3.09202 14.4722 3.19931 14.6073 3.33455C14.7425 3.46963 14.8498 3.63005 14.923 3.80663C14.9962 3.98321 15.0339 4.17249 15.0339 4.36364C15.0339 4.55479 14.9962 4.74406 14.923 4.92064C14.8498 5.09722 14.7425 5.25764 14.6073 5.39273L14.5636 5.43636C14.396 5.60777 14.2835 5.82547 14.2407 6.06139C14.1979 6.29731 14.2268 6.54064 14.3236 6.76V6.81818C14.4158 7.03329 14.5689 7.21674 14.764 7.34596C14.9591 7.47518 15.1878 7.54452 15.4218 7.54545H15.5455C15.9312 7.54545 16.3012 7.6987 16.574 7.97148C16.8468 8.24426 17 8.61423 17 9C17 9.38577 16.8468 9.75574 16.574 10.0285C16.3012 10.3013 15.9312 10.4545 15.5455 10.4545H15.48C15.246 10.4555 15.0173 10.5248 14.8222 10.654C14.6271 10.7833 14.474 10.9667 14.3818 11.1818Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        moreVertical: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 9.75C9.41421 9.75 9.75 9.41421 9.75 9C9.75 8.58579 9.41421 8.25 9 8.25C8.58579 8.25 8.25 8.58579 8.25 9C8.25 9.41421 8.58579 9.75 9 9.75Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 4.5C9.41421 4.5 9.75 4.16421 9.75 3.75C9.75 3.33579 9.41421 3 9 3C8.58579 3 8.25 3.33579 8.25 3.75C8.25 4.16421 8.58579 4.5 9 4.5Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 15C9.41421 15 9.75 14.6642 9.75 14.25C9.75 13.8358 9.41421 13.5 9 13.5C8.58579 13.5 8.25 13.8358 8.25 14.25C8.25 14.6642 8.58579 15 9 15Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        refresh: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 2.72552V7.08916H12.6364" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M1 14.3619V9.99829H5.36364" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M2.82545 6.36192C3.1943 5.31958 3.82119 4.38766 4.64761 3.65313C5.47404 2.91859 6.47307 2.40538 7.55148 2.16138C8.6299 1.91737 9.75255 1.95053 10.8147 2.25775C11.8768 2.56497 12.8438 3.13625 13.6255 3.91828L17 7.08919M1 9.99828L4.37455 13.1692C5.15618 13.9512 6.12318 14.5225 7.18532 14.8297C8.24745 15.1369 9.3701 15.1701 10.4485 14.9261C11.5269 14.6821 12.526 14.1689 13.3524 13.4343C14.1788 12.6998 14.8057 11.7679 15.1745 10.7256" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        search: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.1111 15.2222C12.0385 15.2222 15.2222 12.0385 15.2222 8.1111C15.2222 4.18375 12.0385 1 8.1111 1C4.18375 1 1 4.18375 1 8.1111C1 12.0385 4.18375 15.2222 8.1111 15.2222Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 17L13.1333 13.1334" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    },
    strokeWidth: '1',

    set: async (iconName, element) => {
        let icon = Icon.icons[iconName]
        if (icon) {
            Icon.setIcon(icon, element)
            return 
        }
        const svg = await Icon.getTextAwait(iconName)
        Icon.icons[iconName] = svg
            .replaceAll('stroke="white"', 'stroke="var(--text-color)"')
        // Icon.readSvg(
        //     iconName,
        //     (svg) => {
                Icon.setIcon(svg, element)
        //     }
        // )
    },

    readSvg: (name, onRead) => {
        Icon.getText(
            name,
            (svg) => {
                const i = svg
                    .replaceAll('white', 'var(--text-color)')
                    // .replaceAll('stroke-width="1.5"', `stroke-width="${Icon.strokeWidth}"`)
                    // .replace(/(?:\r\n|\r|\n)/g, '')
                Icon.icons[name] = i
                if (onRead) {
                    onRead(i)
                }
            }
        )
    },

    initIcons: () => {
        for(const [key, value] of Object.entries(Icon.icons)) {
            Icon.icons[key] = value
                .replaceAll('stroke="white"', 'stroke="var(--text-color)"')
        }
    },

    init: async () => {
        for(const name of Icon.names) {
            const svg = await Icon.getTextAwait(name)
            Icon.icons[name] = svg
                .replaceAll('white', 'var(--text-color)')
        }
    },

    setIcon: (icon, element) => {
        if (element instanceof SvgIcon) {
            element.content(
                {
                    svg: icon
                }
            )
        }
    },

    getTextAwait: async (iconName) => {
        const response = await fetch("images/" + iconName + ".svg", { cache: 'default', priority: 'high' })
        const text = await response.text()
        return text
    },

    getText: (iconName, onRes) => {
        fetch("images/" + iconName + ".svg", { cache: 'default' })
            .then((res) => res.text())
            .then(onRes)
            .catch((e) => console.error(e));
    }
}
Icon.initIcons()