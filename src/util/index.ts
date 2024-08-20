import type { MouseEvent } from 'react'


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
