import React from 'react';

interface IProps {
  loadMore: boolean,
  callBack : ()=> void,
  loadOnMount?: boolean,
  container?: any
}

interface IState {
  container: any
}

class InfinitScroller extends React.PureComponent<IProps, IState> {
  
  constructor(props: IProps) {
    super(props)
    this.state = {
      container : this.props.container
    }
  }

  componentDidUpdate() {
    // if (!this.props.container) {
    // }
    // this.props.container = this.props.container;
    this.setState({container:  this.props.container});
    window.addEventListener('scroll', this.onScroll);

  }
  
  componentDidMount() {
    
    const {loadOnMount, callBack} = this.props;
    const {container} = this.state

    console.log('container: ',  container);   
    
    if ((loadOnMount && container) || (!loadOnMount && container)) {
      callBack();
      console.log('container first: ', this.props.container);
      container.addEventListener('scroll', this.onScroll);
    } else if(loadOnMount && !container) {
      callBack();
      console.log('container here found:',  this.props.container);
      window.addEventListener('scroll', this.onScroll);
    } else if (!container) {
      window.addEventListener('scroll', this.onScroll);
    }
  }

  private onScroll = () => {

    const {callBack, container, loadMore} = this.props;
    
    if (container) {
      if (
          (container.scrollTop + container.clientHeight >= container.scrollHeight) && loadMore) {
        callBack();
        container.removeEventListener('scroll', this.onScroll);
      }
    } else {
      if ((window.scrollY + window.innerHeight) >= document.body.scrollHeight) {
        callBack();
        window.removeEventListener('scroll', this.onScroll);
      } // end if
    } // end else
  } // end onScroll

  render() {
    return(
      <div className='data-container'> {this.props.children} </div>
    )
  }
} // end class

export default InfinitScroller;
