import { type Meta, type StoryFn } from '@storybook/react';
import { useState } from 'react';

import Filter from './Filter';
import { type FilterGroup } from './model';

export default {
    title: 'Components/Filter',
    component: Filter,
    argTypes: {
        filterGroups: {
            control: 'object',
        },
    },
} as Meta<typeof Filter>;

const Template: StoryFn<typeof Filter> = (args) => {
    const [filterGroups, setFilterGroups] = useState<FilterGroup[]>(
        args.filterGroups,
    );

    const handleCheckboxChange =
        (groupIndex: number, optionIndex: number) =>
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const newFilterGroups = [...filterGroups];
            newFilterGroups[groupIndex].options[optionIndex].checked =
                event.target.checked;
            setFilterGroups(newFilterGroups);
        };

    const handleClear = (groupIndex: number) => {
        const newFilterGroups = [...filterGroups];
        newFilterGroups[groupIndex].options = newFilterGroups[
            groupIndex
        ].options.map((option) => ({
            ...option,
            checked: false,
        }));
        setFilterGroups(newFilterGroups);
    };

    // Applying the change handlers and clear handlers to the filterGroups
    const filterGroupsWithHandlers = filterGroups.map((group, groupIndex) => ({
        ...group,
        options: group.options.map((option, optionIndex) => ({
            ...option,
            onChange: handleCheckboxChange(groupIndex, optionIndex),
        })),
        onClear: () => handleClear(groupIndex), // Attach the clear handler
    }));

    return (
        <div style={{ width: '250px' }}>
            <Filter {...args} filterGroups={filterGroupsWithHandlers} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    filterGroups: [
        {
            groupName: 'Manufacturer',
            options: [
                {
                    label: 'Sony',
                    checked: false,
                    checkboxColor: '#9575cd',
                    onChange: (_event: React.ChangeEvent<HTMLInputElement>) =>
                        null,
                },
                {
                    label: 'Samsung',
                    checked: false,
                    checkboxColor: '#9575cd',
                    onChange: (_event: React.ChangeEvent<HTMLInputElement>) =>
                        null,
                },
            ],
            showClearButton: true,
        },
        {
            groupName: 'Category',
            options: [
                {
                    label: 'Television',
                    checked: false,
                    checkboxColor: '#9575cd',
                    onChange: (_event: React.ChangeEvent<HTMLInputElement>) =>
                        null,
                },
                {
                    label: 'Monitor',
                    checked: false,
                    checkboxColor: '#9575cd',
                    onChange: (_event: React.ChangeEvent<HTMLInputElement>) =>
                        null,
                },
            ],
            showClearButton: true,
        },
    ],
};
