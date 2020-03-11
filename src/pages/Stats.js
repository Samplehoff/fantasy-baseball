import React from 'react';
import {Card, ListGroup} from 'react-bootstrap'



class Stats extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
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
                    items: info.info
                })
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                })
            }
        )
    }

    render() {
        const {error, isLoaded, items} = this.state;

        if(error) {
            return <div>Error...</div>
        }else if(isLoaded) {
            return <div>Loading...</div>
        }else {
            return (
                <div>
                    {
                            items.map((item) => (
                                <Card style={{ width: '18rem' }}>
                                    <Card.Header>{item.Name}</Card.Header>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>{item.Team}</ListGroup.Item>
                                        <ListGroup.Item>{item.Position}</ListGroup.Item>
                                        <ListGroup.Item>{item.FantasyPointsDraftKings}</ListGroup.Item>
                                        <ListGroup.Item>{items.FantasyPointsFanDuel}</ListGroup.Item>
                                        <ListGroup.Item>{items.FantasyPointsYahoo}</ListGroup.Item>
                                    </ListGroup>
                                </Card>
                                
                            ))
                        }
                </div>
            )
        }
    }
}

export default Stats