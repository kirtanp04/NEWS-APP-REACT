import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
// var PropTypes = require('prop-types');


export class News extends Component {

static defaultProps = {
   country : 'in',
   pageSize:6,
   category:'general'

}
static propTypes ={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
}
   


    constructor(){
        super();
        // console.log('Hello i am a constructor from News component')
        this.state ={
            articles: [],
            loading:false,
            page:1


        }
    }

        async componentDidMount(){
            // console.log("cdm");
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d9d3469dec5e48fa8d8a008927dd8d75&pageSize=${this.props.pageSize}`
            this.setState({loading:true})
            let data = await fetch(url)
            let parsedData = await data.json()
            console.log(parsedData)
            this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults,
                loading:false
            })
       
        }

        handlePrevClick = async () =>{

            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d9d3469dec5e48fa8d8a008927dd8d75&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
            this.setState({loading:true})
            let data = await fetch(url)
            let parsedData = await data.json()
            console.log(parsedData)
            this.setState({articles:parsedData.articles})
            this.setState({
                page: this.state.page - 1,
                loading:false
                
            })
            
        }

        handleNextClick = async () =>{

            if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)) )
            {

            
                 let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d9d3469dec5e48fa8d8a008927dd8d75&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
                 this.setState({loading:true})   
                 let data = await fetch(url)
                    let parsedData = await data.json()
                    
                    console.log(parsedData)
                    this.setState({articles:parsedData.articles})
                    this.setState // eslint-disable-next-line
                    ({
                        page: this.state.page + 1,
                        loading:false
                    })
        }
        }


  render() {
    return (
        
      <div className='container my-3'>
            <h1 className="text-center" style={{margin:'35px 0px'}}>HotNews - Top Headline</h1>
            {this.state.loading && <Spinner/>}
                <div className="row">

                {!this.state.loading && this.state.articles.map((element)=>{

                    return <div className="col-md-4" key={element.url}>
                     
                        <NewsItem  title={element.title?element.title.slice(0,50):""} description={element.description?element.description.slice(0,70):""} imageUrl={element.urlToImage} newsUrl={element.url}></NewsItem>
                     </div>
                })}

                
                    
                </div>
                <div className="container d-flex justify-content-between">
                <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
       </div>
        
      
    
    )
  }
}

export default News