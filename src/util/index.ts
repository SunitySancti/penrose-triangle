import type { MouseEvent } from 'react'
import type { DefaultConfig,
              InititialConfig,
              UnionInitialValues } from 'react-penrose-triangle/dist/types'


export const getDistanceToCenterAndAngleY = (
    event: MouseEvent<SVGSVGElement>,
    centerX: number,
    centerY: number,
    maxAngle = 180,
) => {
    const svg = (event.target as SVGSVGElement).closest('svg')!;
    const rect = svg.getBoundingClientRect();
    const pointX = rect.x + centerX;
    const pointY = rect.y + centerY;

    const mouseX = event.nativeEvent.clientX;
    const mouseY = event.nativeEvent.clientY;
    
    const dx = mouseX - pointX;
    const dy = mouseY - pointY;
    const distance = Math.sqrt(dx ** 2 + dy ** 2);

    const radians = Math.atan2(mouseY - pointY, mouseX - pointX);
    const degrees = (180 * radians / Math.PI) + 90;

    const positiveAngle = degrees < 0 ? degrees + 360 : degrees;
    const balancedAngle = degrees > 180 ? degrees - 360 : degrees

    return {
        distance,
        positiveAngle: Math.floor(positiveAngle),
        balancedAngle: balancedAngle >= 0
            ?  Math.min(balancedAngle, maxAngle)
            :  Math.max(balancedAngle, -maxAngle)
    }
}

function getEntries<T extends {}>(obj: T): [keyof T, T[keyof T]][] {
    return Object.entries(obj) as [keyof T, T[keyof T]][];
}
function getKeys<T extends {}>(obj: T) {
    return Object.keys(obj) as (keyof T)[];
}
function optionalClone<T extends {}>(obj?: T) {
    return {...obj || {}} as {[K in keyof T]?: T[K]}
}

export const getDiff = (config: DefaultConfig, defaultConfig: DefaultConfig) => {
    const { geometry, material, light } = config;
    const diffGeometry = optionalClone(geometry);
    const diffMaterial = optionalClone(material);
    const diffLight = optionalClone(light);

    getKeys(geometry).forEach(key => {
        if(defaultConfig.geometry[key] === geometry[key]) {
            delete diffGeometry[key]
        }
    });
    getKeys(material).forEach(key => {
        if(defaultConfig.material[key] === material[key]) {
            delete diffMaterial[key]
        }
    });
    getKeys(light).forEach(key => {
        if(defaultConfig.light[key] === light[key]) {
            delete diffLight[key]
        }
    });
    
    if(geometry.isRotating) {
        delete diffGeometry.rotation
    } else {
        delete diffGeometry.rotationSpeed
    }
    if(light.binding !== false) {
        delete diffLight.rotation
    }

    const diffConfig: InititialConfig = {};

    if(getKeys(diffGeometry).length) {
        diffConfig.geometry = diffGeometry
    }
    if(getKeys(diffMaterial).length) {
        diffConfig.material = diffMaterial
    }
    if(getKeys(diffLight).length) {
        diffConfig.light = diffLight
    }

    return diffConfig
}

const mapProperties = (groupConfig: UnionInitialValues = {}) => getEntries(groupConfig)
     .map(([key, value]) => {
        if(typeof value === 'string') {
            value = `'${ value }'`
        }
        return `\n\t\t${ key }: ${ value }`
});

export const parseConfigToSnippet = (config: InititialConfig = {}) => {
    const mappedGroups = getEntries(config).map(([ groupName, groupConfig ]) => (
        `\n\t${ groupName }: {${ mapProperties(groupConfig) }\n\t}`
    ));

    const mappedGroupsString = mappedGroups.length ? `{   ${ mappedGroups }\n}` : 'undefined || {}';
    return `const initialConfig = ${ mappedGroupsString }`
}
