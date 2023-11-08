import React, { Component } from 'react'
import NewsItem from './NewsItem'
// import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'
import Spinner from './Spinner'

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
    }
    async updateNews() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0016b10889334f3283328333705bde47&page=${this.state.page}&pageSize=${this.props.pageSize}`;

        { this.setState({ loading: true }) }
        let data = await fetch(url);
        let parsedData = await data.json();
        // console.log(parsedData.totalResults);
        this.setState({
            articles: parsedData.articles,
            totalArticles: parsedData.totalResults,
            loading: false
        })
    }
    async componentDidMount() {
        this.updateNews();
    }


    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1 });
        this.updateNews();
    }

    handlePreviewClick = async () => {
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0016b10889334f3283328333705bde47&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        // { this.setState({ loading: true }) }
        let data = await fetch(url);
        let parsedData = await data.json();
        // console.log(parsedData.totalResults);
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalArticles: parsedData.totalResults,
        })
    }

    render() {
        return (
            <>
                <h1 className="text-center" style={{ margin: '35px 0px' }}>Daily Dive - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={true}
                    loader={<Spinner />}>

                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4" key={element.title}>
                                    <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""}
                                        imageUrl={element.urlToImage} newsUrl={element.url}
                                        author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between" >
                    <button type="button" className="btn btn-warning" disabled={this.state.page <= 1} onClick={this.handlePreviewClick}>&larr; Previous</button>
                    <button type="button" className="btn btn-info" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 20)} onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}
            </>
        )
    }
}

export default News