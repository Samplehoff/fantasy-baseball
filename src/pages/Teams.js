import React from 'react';
import {Card, ListGroup, ListGroupItem} from 'react-bootstrap'
import './Teams.css'


class Teams extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        }
    }

    componentDidMount() {
        this.functionTeams();
    }

    findTeams = () => {
        this.setState({
            isLoaded: false
        })
        this.functionTeams()
    }

    functionTeams() {
        fetch("https://api.sportsdata.io/v3/mlb/stats/json/teams?key=5934312643214e288126a5db02650611")
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
        )
    }

    render() {
        const {error, isLoaded, items} = this.state;
            
        if(error) {
            return <div>Error...</div>
        }else if(!isLoaded) {
            return <div>Loading...</div>
        }else {
            return (
                <div className="background">
                    <div className="image">
                
                    {
                            items.map((item) => (
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={item.WikipediaLogoUrl} height="200px" />
                                    <Card.Body>
                                        <Card.Title>{item.City}{item.Name}</Card.Title>
                                    </Card.Body>
                                    <ListGroup className="list-group-flush">
                                        <ListGroupItem>{item.League}</ListGroupItem>
                                        <ListGroupItem>{item.Division}</ListGroupItem>
                                    </ListGroup>
                                    
                                </Card>

                                // <Table striped bordered hover variant="dark">
                                //     <thead>
                                //         <tr>
                                //             <th>Name</th>
                                //             <th>Team</th>
                                //             <th>Position</th>
                                //             <th>Fantasy Points 2019</th>
                                //         </tr>
                                //     </thead>
                                //     <tbody>
                                //         <tr>
                                //             <td role="gridcell">{item.Name}</td>
                                //             <td role="gridcell">{item.Team}</td>
                                //             <td role="gridcell">{item.Position}</td>
                                //             <td className="k-sorted" role="gridcell">
                                //                 {item.FantasyPoints}
                                //             </td>
                                //         </tr>
                                        
                                //     </tbody>
                                // </Table>
                                
                            ))
                            
                    }
                    
                    </div>    

                </div>
                
            )
            
        }
    }
}

export default Teams