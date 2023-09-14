import React, { Component } from 'react';
import "./ScrollUp.css";
class ScrollUpButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    if (window.pageYOffset > 100) {
      this.setState({ isVisible: true });
    } else {
      this.setState({ isVisible: false });
    }
  };

  scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  render() {
    const { isVisible } = this.state;

    return (
      <div className={`scroll-up-button ${isVisible ? 'visible' : 'hidden'}`}>
        <button onClick={this.scrollToTop}>
        🢁
        </button>
      </div>
    );
  }
}

export default ScrollUpButton;
