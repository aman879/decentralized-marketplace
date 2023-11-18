import React from "react";
import Hero from "@components/common/hero/Hero";
import List from "@components/course/list/list";
import Base from "@components/layout/base/Base";
import { data, courseMap } from "@content/courses/fetcher";
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
