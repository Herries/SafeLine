import React, { useEffect, useRef } from "react";
import { getReposInfo, getSetupCount } from "@/api";
import Features from "@/components/home/Features";
import Abilities from "@/components/home/Abilities";
import Partner from "@/components/home/Partner";
import { formatStarNumber } from "@/common/utils";
import { Box, Grid, Button, Link, Typography, Container, Stack } from "@mui/material";
import Image from 'next/image';

const ARTICLES = [
  { title: '《阮一峰·科技爱好者周刊》', href: "https://www.ruanyifeng.com/blog/2023/11/weekly-issue-276.html" },
  { title: '《Hello Github 月刊》', href: "https://zhuanlan.zhihu.com/p/668104673" },
  { title: '《GitHub Daily》', href: "https://zhuanlan.zhihu.com/p/656047298" },
  { title: '《科技 lion》', href: "https://kejilion.blogspot.com/2023/11/npm-waf.html" },
  { title: '《Github 爱好者》', href: "https://mp.weixin.qq.com/s/CO-k2nv-PK0Ij-V5lTbUEQ" },
  { title: '《apisix》', href: "https://github.com/apache/apisix" },
]

const totalSx = {
  color: "primary.main",
  fontSize: "70px",
  background: 'linear-gradient(90deg, #8FE5D7 0%, #0FC6C2 100%)',
  '-webkit-background-clip': 'text',
  '-webkit-text-fill-color': 'transparent',
  lineHeight: 1.25,
  fontFamily: "AlimamaShuHeiTi-Bold",
}

const textAligns = ['left', 'center', 'right'];

export async function getServerSideProps() {
  let total = 48750
  let starCount = 6.5
  const promises = [
    getSetupCount().then((result) => total = result.total),
    getReposInfo().then((result) => starCount = formatStarNumber(result.star_count)),
  ];
  try {
    await Promise.allSettled(promises)
  } finally {
    return {
      props: {
        total,
        starCount,
      },
    }
  }
}

export default function Home({ total, starCount } : { total: number, starCount: number }) {
  const totalRef = useRef(null);
  const startRef = useRef(null);

  const initTotal = async (n: number, starCount: number) => {
    const countUpModule = await import("countup.js");
    const anim = new countUpModule.CountUp(totalRef.current!, Math.max(0, n), {
      duration: 2,
    });
    anim.start();
    const startAnim = new countUpModule.CountUp(startRef.current!, Math.max(0, starCount), {
      duration: 2,
      decimalPlaces: 1,
    });
    startAnim.start();
  };

  useEffect(() => {
    initTotal(total, starCount);
  }, [total, starCount]);

  return (
    <main className="flex flex-col justify-between" title="雷池 WAF 社区版">
      <Box>
        <Box
          sx={{
            width: "100%",
            height: "866px",
            position: 'relative',
          }}
        >
          <Image
            src="/images/home-banner.png"
            alt="雷池 SafeLine 主页背景"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            quality={100}
            // unoptimized={true}
          />
          <Box pt={26.5} className="relative">
            <Box alignItems="center">
              <Stack
                direction="row"
                sx={{
                  color: "#86909C",
                  letterSpacing: { xs: 0, sm: 4, md: 8 },
                }}
                justifyContent={{ xs: "space-between", sm: "center", md: "center" }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    mr: { xs: 0, sm: 22, md: 36.5 },
                    fontWeight: 400,
                    fontSize: { xs: "16px", sm: "20px", md: "24px" },
                  }}
                >
                  基于智能语义分析的
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 400,
                    fontSize: { xs: "16px", sm: "20px", md: "24px" },
                  }}
                >
                  下一代 Web 应用防火墙
                </Typography>
              </Stack>
              <Stack
                direction="row"
                justifyContent={{ xs: "space-between", sm: "center", md: "center" }}
                mt={2}
                sx={{
                  fontFamily: "AlimamaShuHeiTi-Bold",
                  letterSpacing: { xs: 5, md: 12 },
                  background: 'linear-gradient(90deg, #160847 0%, #0A7977 100%)',
                  '-webkit-background-clip': 'text',
                  '-webkit-text-fill-color': 'transparent',
                }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    mr: { xs: 0, sm: 10, md: 15.5 },
                    fontSize: { xs: "30px", sm: "60px", md: "80px" },
                  }}
                >
                  不让黑客
                </Typography>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: "30px", sm: "60px", md: "80px" },
                  }}
                >
                  越雷池一步
                </Typography>
              </Stack>
            </Box>
          </Box>
          <Box sx={{ position: 'absolute', bottom: { xs: 470, sm: 428, md: 351 }, left: '50%', transform: 'translateX(-50%)' }}>
            <Box  width={{ xs: "209px", sm: "269px", md: "369px" }}>
              <Image
                src="/images/gif/waf-logo.gif"
                alt="SafeLine logo"
                layout="responsive"
                width={369}
                height={369}
              />
            </Box>
          </Box>
        </Box>
        <Box sx={{ position: "relative", bottom: "360px", marginBottom: "-360px" }}>
          <Container>
            <Box
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                variant="contained"
                target="_blank"
                sx={{
                  width: { xs: "100%", sm: "188px" },
                  height: "60px",
                  ml: { xs: 0, sm: 0 },
                  mb: { xs: 0, sm: 0 },
                  fontSize: "20px",
                  boxShadow: "0px 15px 25px 0px rgba(15,198,194,0.3)",
                }}
                href="https://waf-ce.chaitin.cn/posts/guide_install"
              >
                立即安装
              </Button>
            </Box>
          </Container>
          <Container>
            <Box mt={7.5}>
              <Grid container justifyContent="center">
                <Grid item xs={12} sm={6}>
                  <Stack spacing={2} alignItems="center">
                    <Typography
                      variant="h1"
                      sx={{
                        ...totalSx,
                      }}
                      ref={totalRef}
                    >
                      -
                    </Typography>
                    <Typography variant="h5">
                      装机量
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} mt={{ xs: 2, sm: 0 }} sx={{ display: "flex", justifyContent: "center" }}>
                  <Link href="https://github.com/chaitin/SafeLine" target="_blank">
                    <Stack direction="row" justifyContent="center">
                        <Stack spacing={2} alignItems="center">
                          <Stack direction="row" sx={{ ...totalSx }}>
                            <Typography
                              variant="h1"
                              ref={startRef}
                              fontSize="70px"
                            >
                              -
                            </Typography>
                            <Typography variant="h1" fontSize="70px">k</Typography>
                          </Stack>
                          <Typography variant="h5">
                            GitHub Star
                          </Typography>
                        </Stack>
                        <Image
                          src="/images/gif/starred.gif"
                          alt="starred"
                          width={80}
                          height={78}
                          style={{ marginTop: "6px" }}
                        />
                    </Stack>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Container>
          <Container>
            <Box mt={7}>
              <Grid container spacing={2}>
                {ARTICLES.map((article, index) => (
                  <Grid key={article.title} item xs={12} sm={4}>
                    <Typography
                      variant="h5"
                      sx={{
                        textAlign: { xs: 'center', md: textAligns[index % 3] },
                      }}
                    >
                      <Link
                        sx={{ color: "#86909C", fontFamily: "AlimamaShuHeiTi-Bold", fontSize: "20px" }}
                        target="_blank"
                        href={article.href}
                      >
                        {article.title}
                      </Link>
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Container>
          <Container sx={{ pb: 3, mb: 3, mt: 18 }}>
            <Features />
          </Container>
          <Abilities />
          <Box
            sx={{ position: "relative" }}
          >
            <Image
              src="/images/partner-bg.png"
              alt="partner bg"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
            <Partner />
          </Box>
          <Box
            sx={{
              width: "100%",
              height: { xs: "243px", md: "343px" },
              mt: 19,
              backgroundImage: "url(/images/enterprise-bg.svg)",
              backgroundSize: "cover",
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <Container className="relative h-full">
              <Stack justifyContent="center" className="h-full">
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 400,
                    color: "common.white",
                    fontSize: { xs: "20px", md: "28px" },
                    fontFamily: "AlimamaShuHeiTi-Bold",
                    letterSpacing: "3px",
                  }}
                  >欢迎使用雷池其他版本</Typography>
                <Button
                  variant="outlined"
                  sx={{
                    width: { xs: "146px" },
                    height: "50px",
                    mt: 4,
                    backgroundColor: "common.white",
                    fontSize: "16px",
                    "&:hover": {
                      color: "#0A8A87",
                      backgroundColor: "common.white",
                    },
                  }}
                  href="/version"
                >
                  版本对比
                </Button>
              </Stack>
              <Box
                sx={{
                  position: "absolute",
                  right: -96,
                  top: -65,
                }}
              >
                <Box width={{ xs: 267, sm: 417 }} height={359}>
                  <Image
                    src="/images/shield.png"
                    alt="雷池"
                    layout="responsive"
                    width={417}
                    height={359}
                  />
                </Box>
              </Box>
            </Container>
          </Box>
        </Box>
      </Box>
    </main>
  )
}
