import React from "react";
import Hero from "@components/ui/common/hero/Hero";
import List from "@components/ui/course/list/list";
import Base from "@components/ui/layout/base/Base";
import courses from "@content/courses/index.json";

class Home extends React.Component {

  render() {
    return (
      <Base>
        <Hero />
        <List courses={courses}/>
      </Base>
      )
    }
}

export default Home;
