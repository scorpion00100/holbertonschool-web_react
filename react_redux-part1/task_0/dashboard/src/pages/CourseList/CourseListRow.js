import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

function CourseListRow({ isHeader, textFirstCell, textSecondCell }) {
    let content;
    const [isChecked, setIsChecked] = useState(false);
    const bg = {
        backgroundColor: isHeader ? '#deb5b545': '#f5f5f5ab'
    };
    const styleCheckedRow = isChecked ? css(styles.rowChecked) : '';
    
    if (isHeader) {
        if (!textSecondCell) {
            content = (<th className={css(styles.firstTr, styles.th)} colSpan={2}>{textFirstCell}</th>)
        } else {
            content = (
                <>
                    <th className={css(styles.th)}>{textFirstCell}</th>
                    <th className={css(styles.th)}>{textSecondCell}</th>
                </>
            );
        }
    } else {
        content = (
            <>
                <td><input type="checkbox" onChange={() => { setIsChecked(!isChecked) }} checked={isChecked}/> {textFirstCell}</td>
                <td>{textSecondCell}</td>
            </>
        );
    }
    return (
        <tr style={bg} className={styleCheckedRow}>
            {content}
        </tr>
    );
}

CourseListRow.propTypes = {
    isHeader: PropTypes.bool,
    textFirstCell: PropTypes.string.isRequired,
    textSecondCell: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};

CourseListRow.defaultProps = {
    isHeader: false,
    textSecondCell: null
};

const styles = StyleSheet.create({
    firstTr: {
        textAlign: 'center'
    },
    th: {
        padding: '.4rem 0',
        borderBottom: 'solid 2px rgb(227, 220, 220)'
    },
    rowChecked: {
        background: '#e6e4e4'
    }
});

export default CourseListRow;
