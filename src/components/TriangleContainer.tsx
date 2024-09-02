import { useCallback,
         useState,
         useEffect } from 'react'
import { Box,
         Tab,
         Tabs,
         Stack } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import CodeIcon from '@mui/icons-material/Code'
import CopyIcon from '@mui/icons-material/ContentCopy'
import DoneIcon from '@mui/icons-material/Done'
import styled from 'styled-components'
import { useTheme } from 'styled-components'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import * as prism from 'react-syntax-highlighter/dist/esm/styles/prism'

import { defaultValues } from 'react-penrose-triangle'
import { getDiff,
         parseConfigToSnippet } from 'util'

import type { TriangleContainerProps,
              CodeSnippetProps,
              TabPanelProps
} from 'interfaces/components'


const GlassCard = styled(Box)(({ theme }) => ({
    width: `calc(min(100vw, 100vh) - ${ theme.sizes.smallMargin * 2 }px)`,
    height: `calc(min(100vw, 100vh) - ${ theme.sizes.smallMargin * 2 }px)`,
    margin: '10px',
    borderRadius: '10px',
    overflow: 'hidden',
}));

const StyledIconButtonContainer = styled(Box)<{ $isMatted: boolean, $isInSnippet: boolean, $disabled: boolean }>(({ theme, $isMatted, $isInSnippet, $disabled }) => ({
    position: 'absolute',
    zIndex: 1,
    top: $isInSnippet ? 3 : 0,
    right: $isInSnippet ? 3 : 0,
    borderRadius: $isInSnippet
        ? 8
        : `0 ${ theme.sizes.borderRadius }px 0 ${ theme.sizes.borderRadius }px`,
    transition: theme.transitions.main,
    backgroundColor: $isInSnippet
        ? theme.palette.transparent_white_25
        // ? theme.palette.codeSnippetButton
        : $isMatted
        ? theme.palette.transparent_white_00
        : theme.palette.transparent_white_60,
    color: $isInSnippet
        ? 'rgba(0,0,0,0.7)'
        : 'rgba(0,0,0,0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: $isInSnippet ? '56px' :  theme.sizes.buttonSize,
    height: $isInSnippet ? '56px' :  theme.sizes.buttonSize,
    '&:hover': $disabled ? undefined : {
        color: 'rgba(0,0,0,0.9)',
        backgroundColor: $isInSnippet
            ? theme.palette.codeSnippetButtonHover
            : undefined
    },
    pointerEvents: $disabled ? 'none' : 'all',
}));

const IconButton = ({
    Icon = <CodeIcon/>,
    onClick = console.log,
    isMatted = false,
    isInSnippet = false,
    disabled = false
}) => (
    <StyledIconButtonContainer {...{
        onClick,
        $isMatted: isMatted,
        $isInSnippet: isInSnippet,
        $disabled: disabled,
    }}>
        { Icon }
    </StyledIconButtonContainer>
)

const DocsContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    top: '-100%',
    left: 0,
    width: '100%',
    height: '100%',
    padding: theme.sizes.largeMargin,
    ...theme.mixins.flexColumnStart,
}));

const StyledTabPanel = styled(Box)(({ theme }) => ({
    width: '100%',
    height: 'calc(100% - 100px)',
    flex: 1,
    display: 'flex',
    flexFlow: 'column',
    ...theme.mixins.scrollbar,
}));

const CustomTabPanel = ({ children, value, index, ...props }: TabPanelProps) => {
    return value === index 
        ?   <StyledTabPanel
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...props}
            >
                {children}
            </StyledTabPanel>
        :   undefined
};

const StyledHeader = styled('h3')<{ $isActive: boolean }>(({ theme, $isActive }) => ({
    padding: `${ theme.sizes.largeMargin }px 5px !important`,
    margin: `0 !important`,
    textAlign: 'center',
    fontFamily: 'sans-serif',
    fontWeight: '500',
    fontSize: '1.2rem',
    cursor: 'pointer',
    flex: 0,
    color: $isActive ? theme.palette.gray_90 : theme.palette.gray_50
}));

const CodeSnippetContainer = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.codeSnippetBackground,
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '12px',
    padding: '3px',
}))

const CodeSnippet = ({ codeString, language = 'jsx' }: CodeSnippetProps) => {
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        if(isCopied) {
            const timer = setTimeout(() => setIsCopied(false), 3000);
            return () => {
                clearTimeout(timer);
            };
        }
    },[ isCopied ]);

    return ( 
    codeString
    ?   <CodeSnippetContainer>
            <IconButton {...{
                Icon: isCopied ? <DoneIcon/> : <CopyIcon/>,
                onClick: async () => {
                    await navigator.clipboard.writeText(codeString);
                    setIsCopied(true)
                },
                isInSnippet: true
            }}/>
            <SyntaxHighlighter
                language={ language }
                style={ prism.synthwave84 }
                customStyle={{
                    scrollbarGutter: 'stable both-edges',
                    width: '100%',
                    height: '100%',
                    margin: 0,
                }}
                wrapLongLines
            >
                { codeString }
            </SyntaxHighlighter>
        </CodeSnippetContainer>
    : undefined
)}

const TriangleContainer = ({
    children,
    config,
}: TriangleContainerProps) => {
    const { materials, sizes, transitions } = useTheme();
    const [ isMatted, setIsMatted ] = useState(false);

    const glassStyles = isMatted
        ? materials.matteGlass
        : materials.transparentGlass

    const toggleMatteness = useCallback(() => {
        setIsMatted(!isMatted)
    },[ setIsMatted, isMatted ]);

    const diff = getDiff(config, defaultValues);
    const configCodeString = parseConfigToSnippet(diff);

    const [currentTab, setCurrentTab] = useState(0);

    const handleTabChange = (_e: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
    };

    const usageControlledCodeString = `import { observer,\n         PenroseTriangle,\n         usePenroseTriangle } from 'react-penrose-triangle'\n\n// Use the component and the hook in same parent\n// And wrap parent component with the observer()\n\nconst YourParentComponent = observer((props) => {\n\n\t// You can use hook's config and controllers in two ways.\n\t// As separate full state/setters objects: config/controllers\n\t// Or both together, grouped by slices: geometry/material/light\n\n\tconst { props, config, controllers, geometry, material, light } = usePenroseTriangle(initialConfig)\n\n\treturn <>\n\t\t<PenroseTriangle {...props }/>\n\n\t\t<YourCustomConfigDisplay {...{ config }}/>\n\t\t<YourCustomController {...{ config, controllers }}/>\n\n\t\t<YourCustomGeometryController {...{ geometry }}/>\n\t\t<YourCustomStyleController {...{ material, light }}/>\n\t</>\n});`

    const usageUncontrolledCodeString = `import { PenroseTriangle } from 'react-penrose-triangle'\n\n// Just use this with initial config in any place of your jsx\n\n<PenroseTriangle {...initialConfig }/>`

    const installNpmCodeString = `npm install --save react-penrose-triangle`
    const installYarnCodeString = `yarn add react-penrose-triangle`

    const [activeTab, setActiveTab] = useState<'install' | 'controlled' | 'uncontrolled'>('install');

    return (
        <GlassCard {...{
            style: {
                ...glassStyles,
                transition: transitions.main
            }
        }}>
            <IconButton {...{
                Icon: isMatted ? <VisibilityIcon/> : <CodeIcon/>,
                isMatted,
                onClick: toggleMatteness,
            }}/>

            <Box style={{
                opacity: isMatted ? 0.2 : 1,
                transition: transitions.main,
                pointerEvents: isMatted ? 'none' : 'auto',
                width: '100%',
                height: '100%',
            }}>
                { children }
            </Box>

            <DocsContainer style={{
                opacity: isMatted ? 1 : 0,
                transition: transitions.main,
                pointerEvents: isMatted ? 'auto' : 'none',
            }}>
                <Tabs value={currentTab} onChange={handleTabChange} aria-label="basic tabs example">
                    <Tab {...{
                        label: 'Config',
                        id: 'simple-tab-0',
                        'aria-controls': 'simple-tabpanel-0'
                    }}/>
                    <Tab {...{
                        label: 'Usage',
                        id: 'simple-tab-1',
                        'aria-controls': 'simple-tabpanel-1'
                    }}/>
                </Tabs>
                <CustomTabPanel value={currentTab} index={0}>
                    <Box style={{ height: sizes.largeMargin * 3.15 }}/>
                    <CodeSnippet
                        codeString={ configCodeString }
                    />
                </CustomTabPanel>
                <CustomTabPanel value={currentTab} index={1}>
                    <Stack component='div' direction='row' sx={{
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        width: '100%',
                        flex: 0,
                    }}>
                        <StyledHeader
                            children='Install'
                            $isActive={ activeTab === 'install' }
                            onClick={() => setActiveTab('install')}
                        />
                        <StyledHeader
                            children='Controlled'
                            $isActive={ activeTab === 'controlled' }
                            onClick={() => setActiveTab('controlled')}
                        />
                        <StyledHeader
                            children='Uncontrolled'
                            $isActive={ activeTab === 'uncontrolled' }
                            onClick={() => setActiveTab('uncontrolled')}
                        />
                    </Stack>
                    { activeTab === 'controlled'
                        ?   <CodeSnippet codeString={ usageControlledCodeString }/>
                    : activeTab === 'uncontrolled'
                        ?   <CodeSnippet codeString={ usageUncontrolledCodeString }/>
                    : activeTab === 'install'
                        ? <>
                            <CodeSnippet codeString={ installNpmCodeString } language='shell'/>
                            <Box style={{ height: sizes.largeMargin }}/>
                            <CodeSnippet codeString={ installYarnCodeString } language='shell'/>
                        </>
                        : undefined
                    }
                    
                </CustomTabPanel>
            </DocsContainer>
                
        </GlassCard>
    )
};

export default TriangleContainer
