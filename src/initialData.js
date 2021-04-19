const initialData = {
    cards:[
        {
            id: 'card-1',
            title: 'Read The Grapes of Wrath',
        },
        {
            id: 'card-2',
            title: 'Finish Death Stranding'
        },
        {
            id: 'card-3',
            title: 'Listen to CHVRCHES'
        },
        {
            id: 'card-4',
            title: 'Watch BoJack Horseman'
        },
        {
            id: 'card-5',
            title: 'Watch Grave of The Fireflies'
        },
        {
            id: 'card-6',
            title: 'Get to 2000 in Blitz on chess.com'
        },
        {
            id: 'card-7',
            title: 'Get to 2000 in Bullet on chess.com'
        },
        {
            id: 'card-8',
            title: 'Unlock the Deagle 44 in Battlefield 4'
        },
        {
            id: 'card-9',
            title: 'Connect DB to project'
        },
        {
            id: 'card-10',
            title: '100 push-ups'
        },
        {
            id: 'card-11',
            title: 'Some other task????'
        }
    ],
    lists:[
        {
            id: 'list-1',
            title: 'To Do List',
            hasCards: ['card-1', 'card-2', 'card-5', 'card-8', 'card-9']
        },
        {
            id: 'list-2',
            title: 'In Progress List',
            hasCards: ['card-3', 'card-6']
        },
        {
            id: 'list-3',
            title: 'Done List',
            hasCards: ['card-4', 'card-7']
        },
        {
            id: 'list-4',
            title: 'Not gonna happen soon List',
            hasCards: ['card-10', 'card-11']
        }
    ],  
    order: ['list-1', 'list-2', 'list-3', 'list-4'] 
}

export default initialData;