import SvgIcon from '@mui/material/SvgIcon'

interface IconProps<T> {
    name: keyof typeof data,
    color?: T,
}

interface IconData<T extends string | string[]> {
    path: T,
    fill: T,
}

function wrapInArray(value: string | string[] | undefined) {
    if(typeof value === 'string') {
        return [ value ]
    } else if(Array.isArray(value)) {
        return value
    } else {
        return []
    }
}


const Icon = <T extends string | string[]>({ name, color }: IconProps<T>) => {
    const iconData = data[name] as IconData<T>;
    const paths = wrapInArray(iconData.path);

    return iconData && (
        <SvgIcon>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fillRule="evenodd"
                clipRule="evenodd"
                shapeRendering="geometricPrecision"
            > {
                paths.map((d, idx) => {
                    const fill = wrapInArray(color)[idx]
                              || wrapInArray(iconData.fill)[idx]
                    return (
                        <path {...{ fill, d }} key={ idx }/>
                    )
                })
            } </svg>
        </SvgIcon>
    )
}

const data = {
    colorfulCube: {
        path: [
            "M17.789 2.973a1 1 0 0 0-.866-.5H7.077a1 1 0 0 0-.866.5l-4.923 8.526a1 1 0 0 0 0 1l4.923 8.527a1 1 0 0 0 .866.5h9.846a1 1 0 0 0 .866-.5l4.922-8.527a1 1 0 0 0 0-1L17.79 2.973Zm-.578 1-4.634 8.026 4.634 8.027 4.634-8.027-4.634-8.026Zm-.866 16.553-4.634-8.027H2.443l4.634 8.027h9.268ZM2.443 11.499h9.268l4.634-8.026H7.077l-4.634 8.026Z",
            "M2.443 11.5h9.269l4.634-8.027H7.078l-4.635 8.026Z",
            "M16.346 20.526 11.712 12.5H2.443l4.635 8.026h9.268Z",
            "m17.212 3.973-4.634 8.026 4.634 8.027 4.634-8.027-4.634-8.026Z"
        ],
        fill: [
            "rgba(0, 0, 0, 0.5)",
            "#4CDAC9",
            "#4A26C9",
            "#E77EC9"
        ]
    },
    outlinedCube: {
        path: "M17.789 2.973a1 1 0 0 0-.866-.5H7.077a1 1 0 0 0-.866.5l-4.923 8.526a1 1 0 0 0 0 1l4.923 8.527a1 1 0 0 0 .866.5h9.846a1 1 0 0 0 .866-.5l4.922-8.527a1 1 0 0 0 0-1L17.79 2.973Zm-.578 1-4.634 8.026 4.634 8.027 4.634-8.027-4.634-8.026Zm-.866 16.553-4.634-8.027H2.443l4.634 8.027h9.268ZM2.443 11.499h9.268l4.634-8.026H7.077l-4.634 8.026Z",
        fill: "rgba(0, 0, 0, 0.5)"
    }
}

export default Icon
