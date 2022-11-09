import * as React from "react"
import { graphql, Link } from "gatsby"
import { Box, Card, Image, Heading } from "rebass"
import Layout from "../components/layout"
import Seo from "../components/seo"
import styled from "styled-components"

const Grid = styled(Box)`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  display: grid;
  gap: 100px;
  grid-template-columns: repeat(auto-fit, minmax(128px, 1fr));
`
const IndexPage = ({ data }) => (
  <Layout>
    <Seo title="Home" />
    <Grid>
      {data.allContentfulBlogPost.edges.map(edge => (
        <Card key={edge.node.id} width={256} p={3}>
          <Link to={edge.node.slug}>
            <Image src={edge.node.heroImage.url} alt="hero image" />
          </Link>
          <Heading>{edge.node.title}</Heading>
          <div>{edge.node.body.childMarkdownRemark.excerpt}</div>
        </Card>
      ))}
    </Grid>
  </Layout>
)

export const Head = () => <Seo title="Home" />

export default IndexPage

export const query = graphql`
  {
    allContentfulBlogPost {
      edges {
        node {
          id
          title
          slug
          body {
            childMarkdownRemark {
              excerpt
            }
          }
          heroImage {
            url
            gatsbyImageData(
              layout: CONSTRAINED
              width: 600
              placeholder: BLURRED
            )
          }
        }
      }
    }
  }
`
