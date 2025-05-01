import { fireEvent, render, screen, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import coursesSlice, { fetchCourses } from '../../../features/courses/coursesSlice';
import CourseListRow from "./CourseListRow";
import CourseList from '../CourseList';

const axiosMock = new MockAdapter(axios);

describe('CourseListRow', () => {
    const COURSES_DATA = [
        { id: 1, name: 'ES6', credit: 60 },
        { id: 2, name: 'Webpack', credit: 20 },
        { id: 3, name: 'React', credit: 40 }
    ];
    let store;
    beforeEach(() => {
        store = configureStore({
            reducer: {
                courses: coursesSlice
            },
        });
        axiosMock.onGet('http://localhost:5173/courses.json').reply(200, {
            courses: COURSES_DATA.map(c => ({ ...c, isSelected: false }))
        });
    });
    afterEach(() => {
        axiosMock.reset();
    });

    test('Renders a header row with one cell', () => {
        render(
            <CourseListRow isHeader={true} textFirstCell="Available courses" />
        );
        const headerCell = screen.getByRole('columnheader', { name: 'Available courses' });
        expect(headerCell).toHaveAttribute('colSpan', '2');
    });

    test('Renders a header row with two cells', () => {
        render(
            <CourseListRow
                isHeader={true}
                textFirstCell="Course name"
                textSecondCell="Credit"
            />
        );
        const headerCell1 = screen.getByRole('columnheader', { name: 'Course name' });
        const headerCell2 = screen.getByRole('columnheader', { name: 'Credit' });
        expect(headerCell1).toBeInTheDocument();
        expect(headerCell2).toBeInTheDocument();
    });

    test('Renders a regular row', () => {
        render(
            <CourseListRow
                isHeader={false}
                textFirstCell="ES6"
                textSecondCell="60"
            />
        );
        const cell1 = screen.getByRole('cell', { name: 'ES6' });
        const cell2 = screen.getByRole('cell', { name: '60' });
        expect(cell1).toBeInTheDocument();
        expect(cell2).toBeInTheDocument();
    });

    test('Calls onChangeRow when the checkbox is clicked', async () => {
        await store.dispatch(fetchCourses());
        render(
            <Provider store={store}>
                <CourseList />
            </Provider>
        );
        const rows = screen.getAllByRole('row').filter(row => {
            return !row.querySelector('th');
        });
        expect(rows).toHaveLength(COURSES_DATA.length);
        rows.forEach((row, index) => {
            const course = COURSES_DATA[index];
            const cells = within(row).getAllByRole('cell');
            const checkbox = within(cells[0]).getByRole('checkbox');
            expect(cells[0]).toHaveTextContent(course.name);
            expect(cells[1]).toHaveTextContent(course.credit.toString());
            expect(checkbox).not.toBeChecked();
            fireEvent.click(checkbox);
            expect(checkbox).toBeChecked();
        });
    });

    test('Renders a checked checkbox when isSelected is true', () => {
        const mockOnChangeRow = jest.fn();
        render(
            <CourseListRow
                isHeader={false}
                textFirstCell="ES6"
                textSecondCell="60"
                id={1}
                isSelected={true}
                onChangeRow={mockOnChangeRow}
            />
        );
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeChecked();
        expect(mockOnChangeRow).not.toHaveBeenCalled();
        fireEvent.click(checkbox);
        expect(mockOnChangeRow).toHaveBeenCalledTimes(1);
        expect(mockOnChangeRow).toHaveBeenCalledWith(1, false);
    });
});
