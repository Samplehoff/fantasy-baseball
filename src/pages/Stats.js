import React from 'react';
import {Table} from 'react-bootstrap'



class Stats extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            players: []
        }
    }

    componentDidMount() {
        this.functionStats();
    }

    findStats = () => {
        this.setState({
            isLoaded: false
        })
        this.functionStats()
    }

    functionStats() {
        fetch("https://api.sportsdata.io/v3/mlb/stats/json/PlayerSeasonStats/2019?key=5934312643214e288126a5db02650611")
        .then(res => res.json())
        .then(
            (info) => {
                console.log(info)

                this.setState({
                    isLoaded: true,
                    items: info
                })
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                })
            }
        ).then(
            fetch("https://api.sportsdata.io/v3/mlb/scores/json/Players?key=5934312643214e288126a5db02650611")
            .then(res => res.json())
            .then(
                (pics) => {
                    console.log(pics)
                    this.setState({
                        isLoaded: true,
                        players: pics
                    })
                } 
            )
        )
    }

    render() {
        const {error, isLoaded, items, players} = this.state;
        items.map(item => {
            let playerId = item.PlayerID;
            let myplayer = players.find(element => element.PlayerID === playerId)
            console.log(Object.keys(playerId))
        })
        return <div>Hello</div>
        
    }

    render2() {
        const {error, isLoaded, items, players} = this.state;
        let myplayer = players.find(element => element.PlayerID === 10000001)
        //console.log(myplayer.PhotoUrl)
        console.log(myplayer)
        
        console.log(players)
        console.log(items)  
        if(error) {
            return <div>Error...</div>
        }else if(!isLoaded) {
            return <div>Loading...</div>
        }else {
            return (
                <div>
                    <div>
                    <p>{JSON.stringify(myplayer)}</p>
                    </div>
                    {
                            items.map((item) => (
                                // <Card style={{ width: '18rem' }}>
                                //     <Card.Header>{item.Name}</Card.Header>
                                //     <ListGroup variant="flush">
                                //         <ListGroup.Item>{item.Team}</ListGroup.Item>
                                //         <ListGroup.Item>{item.Position}</ListGroup.Item>
                                //         <ListGroup.Item>{item.FantasyPointsDraftKings}</ListGroup.Item>
                                //     </ListGroup>
                                // </Card>
                                <div>
                                <p></p> 
                                <Table striped bordered hover variant="dark">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Team</th>
                                            <th>Position</th>
                                            <th>Fantasy Points 2019</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td role="gridcell">{item.Name}</td>
                                            <td role="gridcell">{item.Team}</td>
                                            <td role="gridcell">{item.Position}</td>
                                            <td className="k-sorted" role="gridcell">
                                                {item.FantasyPoints}
                                            </td>
                                        </tr>
                                        
                                    </tbody>
                                </Table>
                                </div>
                                
                            ))
                            
                    }
                    
                        

                </div>
                
            )
            
        }
    }
}

export default Stats