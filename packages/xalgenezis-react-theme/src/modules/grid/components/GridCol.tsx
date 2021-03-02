//= Functions & Modules
// Own
import createClassNames from '../utils/createClassNames';
// Pacakges
import React from 'react';
import { boundMethod } from 'autobind-decorator';

//= Structures & Data
// Own
import Breakpoint from '../data/Breakpoints';
import ColumnOffsetProps from '../data/ColumnOffsetProps';
import BreakpointsValues from '../data/BreakpointsValues';
import ColumnOffsetPropsValues from '../data/ColumnOffsetPropsValues';
import ColumnName from '../data/ColumnName';
import OffsetName from '../data/OffsetName';

type Props = {
    [Breakpoint.SM]?: number;
    [Breakpoint.MD]?: number;
    [Breakpoint.LG]?: number;
    [Breakpoint.XL]?: number;
    [Breakpoint.XXL]?: number;
    offset?: number;
    [ColumnOffsetProps.SM]?: number;
    [ColumnOffsetProps.MD]?: number;
    [ColumnOffsetProps.LG]?: number;
    [ColumnOffsetProps.XL]?: number;
    [ColumnOffsetProps.XXL]?: number;
    className: string;
    id?: string;
    children?: React.ReactNode;
};

export default class GridCol extends React.PureComponent {
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

        if (prevProps.className != this.props.className) refreshClassNames = true;
        else if (prevProps.offset != this.props.offset) refreshClassNames = true;
        else {
            for (let i = 0, length = BreakpointsValues.length; i < length && !refreshClassNames; ++i) {
                if (prevProps[BreakpointsValues[i]] !== this.props[BreakpointsValues[i]]) {
                    refreshClassNames = true;
                }
            }

            for (let i = 0, length = ColumnOffsetPropsValues.length; i < length && !refreshClassNames; ++i) {
                if (prevProps[ColumnOffsetPropsValues[i]] !== this.props[ColumnOffsetPropsValues[i]]) {
                    refreshClassNames = true;
                }
            }
        }

        if (refreshClassNames) this.setState({ className: this.getClassName() });
    }

    @boundMethod
    getClassName(): string {
        let className = `${this.props.className} ${createClassNames(ColumnName, this.props, true)}`;

        if (this.props.offset) className += ` .${OffsetName}-${this.props.offset}`;

        for (let i = 0, length = ColumnOffsetPropsValues.length; i < length; ++i) {
            if (this.props[ColumnOffsetPropsValues[i]]) {
                className += ` .${OffsetName}-${ColumnOffsetPropsValues[i]}-${this.props[ColumnOffsetPropsValues[i]]}`;
            }
        }

        return className;
    }

    render() {
        return (
            <div id={this.props.id} className={this.state.className}>
                {this.props.children}
            </div>
        );
    }
}
