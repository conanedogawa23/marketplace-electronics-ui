const mockData = [
    {
        id: Math.random(),
        location: 'ii -167 Penn’s Grove Middle School Lighting',
        project: 'Oxford High School',
        quantity: 1,
        description: 'Conference Room',
    },
    {
        id: Math.random(),
        location: 'iii -102 Lincoln Elementary Gym',
        project: 'Lincoln Elementary School',
        quantity: 2,
        description: 'Gymnasium',
    },
    {
        id: Math.random(),
        location: 'iv -305 West High Science Wing',
        project: 'West High School',
        quantity: 1,
        description: 'Science Laboratory',
    },
    {
        id: Math.random(),
        location: 'i -210 East Middle Cafeteria',
        project: 'East Middle School',
        quantity: 4,
        description: 'Cafeteria',
    },
    {
        id: Math.random(),
        location: 'ii -118 Central High Library',
        project: 'Central High School',
        quantity: 3,
        description: 'Library',
    },
    {
        id: Math.random(),
        location: 'v -123 South Middle Computer Lab',
        project: 'South Middle School',
        quantity: 5,
        description: 'Computer Lab',
    },
    {
        id: Math.random(),
        location: 'iii -250 North High Auditorium',
        project: 'North High School',
        quantity: 2,
        description: 'Auditorium',
    },
    {
        id: Math.random(),
        location: 'iv -167 West Elementary Art Room',
        project: 'West Elementary School',
        quantity: 1,
        description: 'Art Room',
    },
    {
        id: Math.random(),
        location: 'ii -145 Green Middle Music Hall',
        project: 'Green Middle School',
        quantity: 3,
        description: 'Music Hall',
    },
    {
        id: Math.random(),
        location: 'i -189 Blue Ridge High Theater',
        project: 'Blue Ridge High School',
        quantity: 1,
        description: 'Theater',
    },
    {
        id: Math.random(),
        location: 'vi -215 North Middle Science Wing',
        project: 'North Middle School',
        quantity: 2,
        description: 'Science Wing',
    },
    {
        id: Math.random(),
        location: 'i -120 Oak Ridge Elementary Hallway',
        project: 'Oak Ridge Elementary School',
        quantity: 4,
        description: 'Hallway',
    },
    {
        id: Math.random(),
        location: 'ii -300 Central High Basketball Court',
        project: 'Central High School',
        quantity: 3,
        description: 'Basketball Court',
    },
    {
        id: Math.random(),
        location: 'iv -110 South Elementary Playground',
        project: 'South Elementary School',
        quantity: 2,
        description: 'Playground',
    },
    {
        id: Math.random(),
        location: 'iii -250 West Middle Soccer Field',
        project: 'West Middle School',
        quantity: 1,
        description: 'Soccer Field',
    },
    {
        id: Math.random(),
        location: 'ii -170 East High Tennis Courts',
        project: 'East High School',
        quantity: 2,
        description: 'Tennis Courts',
    },
    {
        id: Math.random(),
        location: 'i -140 Green Elementary Art Wing',
        project: 'Green Elementary School',
        quantity: 3,
        description: 'Art Wing',
    },
    {
        id: Math.random(),
        location: 'v -165 Blue Ridge Middle Auditorium',
        project: 'Blue Ridge Middle School',
        quantity: 4,
        description: 'Auditorium',
    },
    {
        id: Math.random(),
        location: 'iii -190 Central Middle Library',
        project: 'Central Middle School',
        quantity: 1,
        description: 'Library',
    },
    {
        id: Math.random(),
        location: 'vi -210 East Elementary Gym',
        project: 'East Elementary School',
        quantity: 2,
        description: 'Gymnasium',
    },
    {
        id: Math.random(),
        location: 'ii -200 North High Cafeteria',
        project: 'North High School',
        quantity: 3,
        description: 'Cafeteria',
    },
];

export const getMockData = (startIndex: number, limit: number) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockData.slice(startIndex, startIndex + limit));
        }, 2000);
    });
};
