import { memo,
         useMemo } from 'react'
import { useTheme } from 'styled-components'

import { useMenuController } from 'util/hooks'
import GeometryMenu from 'components/GeometryMenu'
import MaterialMenu from 'components/MaterialMenu'

import type { MenuControllerProps } from 'interfaces/components'

const MenuController = memo(({ geometry, material, light }: MenuControllerProps) => {
    const { isGeometryActive,
            isMaterialActive,
            toggleGeometryMenu,
            toggleMaterialMenu } = useMenuController();

    const theme = useTheme();
    const controllerStyles = useMemo(() => ({
        colors: {
            fill_1: theme.palette.transparent_black_5,
            fill_2: theme.palette.transparent_black_10,
            fill_3: theme.palette.transparent_black_25,
            fill_controller: theme.palette.primary,
            stroke_1: theme.palette.gray_50,
            stroke_2: theme.palette.gray_90,
        },
        strokeWidths: {
            thin: 1,
            bold: 3,
        }
    }),[]);

    return <>
        <GeometryMenu {...{
            geometry,
            isActive: isGeometryActive,
            toggleActive: toggleGeometryMenu,
            controllerStyles,
        }}/>
        <MaterialMenu {...{
            geometry,
            material,
            light,
            isActive: isMaterialActive,
            toggleActive: toggleMaterialMenu,
            controllerStyles,
        }}/>
    </>
});

export default MenuController
