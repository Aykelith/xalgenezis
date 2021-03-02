//= Functions & Modules
// Own
import createClassNames from '../utils/createClassNames';
// Pacakges
import React from 'react';
import { boundMethod } from 'autobind-decorator';

//= Structures & Data
// Own
import Breakpoint from '../data/Breakpoints';
import BreakpointsValues from '../data/BreakpointsValues';
import ContainerName from '../data/ContainerName';
import ContainerFluidName from '../data/ContainerFluidName';
import BasicContainerProps from '../../../data/ContainerProps';

//= React components
// Own
import BasicContainer from '../../../components/Container';

interface Props extends Partial<BasicContainerProps> {
    [Breakpoint.SM]?: number;
    [Breakpoint.MD]?: number;
    [Breakpoint.LG]?: number;
    [Breakpoint.XL]?: number;
    [Breakpoint.XXL]?: number;
    fluid?: boolean;
    className: string;
    id?: string;
    children?: React.ReactNode;
}

export default class GridContainer extends React.PureComponent {
    props: Props = {
        className: '',
    };

    state: {
        className: string;
    };

    constructor(props: Props) {
        super(props);

        this.state = {
            className: this.getClassName(),
        };
    }

    componentDidUpdate(prevProps: Props) {
        let refreshClassNames = false;

        if (prevProps.fluid != this.props.fluid) refreshClassNames = true;
        else if (prevProps.className != this.props.className) refreshClassNames = true;
        else {
            for (let i = 0, length = BreakpointsValues.length; i < length && !refreshClassNames; ++i) {
                if (prevProps[BreakpointsValues[i]] !== this.props[BreakpointsValues[i]]) {
                    refreshClassNames = true;
                }
            }
        }

        if (refreshClassNames) this.setState({ className: this.getClassName() });
    }

    @boundMethod
    getClassName(): string {
        let className = this.props.className;
        if (this.props.fluid) className += ` .${ContainerName}-${ContainerFluidName}`;
        else className += ' ' + createClassNames(ContainerName, this.props, true);

        return className;
    }

    render() {
        return (
            <BasicContainer {...this.props} className={this.state.className}>
                {this.props.children}
            </BasicContainer>
        );
    }
}
