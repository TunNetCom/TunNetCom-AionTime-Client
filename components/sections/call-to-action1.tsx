"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

export default function CallToAction1() {
  const phoneRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1 },
    );

    if (phoneRef.current) {
      observer.observe(phoneRef.current);
    }

    return () => {
      if (phoneRef.current) {
        observer.unobserve(phoneRef.current);
      }
    };
  }, []);

  return (
    <section className="relative overflow-hidden py-24">
      <div className="relative z-10 w-full">
        <div className="w-full border-b border-dashed border-slate-200/30 dark:border-slate-800/30"></div>

        <MaxWidthWrapper className="my-6">
          {/* Phone mockup */}
          <div ref={phoneRef} className="mx-auto mb-16 max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="group isolate flex flex-col rounded-2xl bg-gray-900 shadow-[inset_0_1px,inset_0_0_0_1px] shadow-white/[0.025]"
            >
              <div className="relative z-10 order-last flex-none px-6 pb-6">
                <h3 className="text-sm font-medium text-white">
                  AionTime Secure Authentication
                </h3>
                <p className="mt-2 text-sm/5 text-gray-400">
                  Fast and reliable two-factor authentication with advanced
                  security features for your DevOps team.
                </p>
              </div>
              <div
                className="pointer-events-none relative min-h-[10.25rem] flex-auto select-none"
                aria-hidden="true"
              >
                <motion.div
                  initial={{ scale: 0.98, y: 0 }}
                  whileInView={{ scale: 1 }}
                  whileHover={{ y: -40 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  viewport={{ once: true }}
                  className="absolute inset-x-0 top-0 isolate h-[calc(206/16*1rem)] overflow-hidden pt-6 transition-transform duration-300 ease-in-out group-hover:-translate-y-10"
                >
                  <div className="to-67% mx-auto h-56 w-[calc(264/16*1rem)] rounded-[calc(44/16*1rem)] bg-gray-800 bg-gradient-to-b from-white/5 to-transparent p-1.5 shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset,0px_2px_5px_0_rgba(0,0,0,0.40)]">
                    <div className="relative h-[calc(200/16*1rem)] overflow-hidden rounded-[calc(38/16*1rem)] bg-gray-950/50 px-5 pt-3 ring-1 ring-inset ring-black/5">
                      <motion.div
                        initial={{ backgroundColor: "#131316" }}
                        whileInView={{ backgroundColor: "#5EE4FF" }}
                        transition={{ delay: 0.3, duration: 0.3 }}
                        viewport={{ once: true }}
                        className="relative z-10 mx-auto flex h-6 w-6 transform-gpu items-center justify-center rounded-full shadow-[rgba(255,255,255,0.05)_0px_1px]"
                      >
                        <svg
                          viewBox="0 0 16 16"
                          className="h-4 w-4"
                          aria-hidden="true"
                        >
                          <path
                            fill="#fff"
                            fillOpacity=".4"
                            d="M3 9a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"
                          ></path>
                          <path
                            fill="#fff"
                            fillOpacity=".4"
                            fillRule="evenodd"
                            d="M8 4a2.5 2.5 0 0 0-2.5 2.5V10h-1V6.5a3.5 3.5 0 1 1 7 0V10h-1V6.5A2.5 2.5 0 0 0 8 4Z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </motion.div>

                      <span className="[perspective:1000px]">
                        <motion.div
                          initial={{
                            y: "-6.5rem",
                            scale: 0.9,
                            opacity: 0.5,
                            filter: "blur(2px)",
                          }}
                          whileInView={{
                            y: 0,
                            scale: 1,
                            opacity: 1,
                            filter: "blur(0px)",
                          }}
                          transition={{ delay: 0.4, duration: 0.3 }}
                          viewport={{ once: true }}
                          className="absolute inset-x-2 top-12 z-20 flex origin-top items-center gap-x-3 rounded-2xl bg-gray-800 p-2 shadow-[rgba(19,19,22,0.6)_0px_6px_12px,rgba(255,255,255,0.03)_0px_1px_inset]"
                        >
                          <div className="flex h-10 w-10 flex-none items-center justify-center rounded-[calc(10/16*1rem)] bg-gray-700 bg-[radial-gradient(circle_at_top,rgba(114,233,255,0.2),rgba(114,233,255,0))] shadow-[0_1px_rgb(255,255,255/0.05)_inset]">
                            <svg
                              className="size-10"
                              viewBox="0 0 40 40"
                              fill="none"
                              aria-hidden="true"
                            >
                              <g filter="url(#filter0_di_5116_3367)">
                                <path
                                  fill="#5DE3FF"
                                  fillRule="evenodd"
                                  d="M20 32c6.627 0 12-5.373 12-12S26.627 8 20 8 8 13.373 8 20s5.373 12 12 12Zm6-12c0 2.761-2.686 5-6 5a7.2 7.2 0 0 1-1.163-.094 1.227 1.227 0 0 0-.79.14c-.613.34-1.308.571-1.983.72-.82.182-1.314-.759-.895-1.485.04-.07.08-.14.119-.212.21-.382.099-.846-.184-1.178C14.409 22.075 14 21.077 14 20c0-2.761 2.686-5 6-5s6 2.239 6 5Z"
                                  clipRule="evenodd"
                                ></path>
                              </g>
                              <defs>
                                <filter
                                  id="filter0_di_5116_3367"
                                  width="42"
                                  height="42"
                                  x="-1"
                                  y="-1"
                                  colorInterpolationFilters="sRGB"
                                  filterUnits="userSpaceOnUse"
                                >
                                  <feFlood
                                    floodOpacity="0"
                                    result="BackgroundImageFix"
                                  ></feFlood>
                                  <feColorMatrix
                                    in="SourceAlpha"
                                    result="hardAlpha"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                  ></feColorMatrix>
                                  <feMorphology
                                    in="SourceAlpha"
                                    operator="dilate"
                                    radius="1"
                                    result="effect1_dropShadow_5116_3367"
                                  ></feMorphology>
                                  <feOffset></feOffset>
                                  <feGaussianBlur stdDeviation="4"></feGaussianBlur>
                                  <feComposite
                                    in2="hardAlpha"
                                    operator="out"
                                  ></feComposite>
                                  <feColorMatrix values="0 0 0 0 0.419608 0 0 0 0 0.905882 0 0 0 0 1 0 0 0 0.3 0"></feColorMatrix>
                                  <feBlend
                                    in2="BackgroundImageFix"
                                    result="effect1_dropShadow_5116_3367"
                                  ></feBlend>
                                  <feBlend
                                    in="SourceGraphic"
                                    in2="effect1_dropShadow_5116_3367"
                                    result="shape"
                                  ></feBlend>
                                  <feColorMatrix
                                    in="SourceAlpha"
                                    result="hardAlpha"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                  ></feColorMatrix>
                                  <feOffset dy="1"></feOffset>
                                  <feComposite
                                    in2="hardAlpha"
                                    k2="-1"
                                    k3="1"
                                    operator="arithmetic"
                                  ></feComposite>
                                  <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.2 0"></feColorMatrix>
                                  <feBlend
                                    in2="shape"
                                    result="effect2_innerShadow_5116_3367"
                                  ></feBlend>
                                </filter>
                              </defs>
                            </svg>
                          </div>
                          <div className="min-w-0">
                            <div className="text-[0.625rem]/4 font-medium text-[#5DE3FF]">
                              AionTime Security
                            </div>
                            <div className="truncate text-xs/4 text-gray-200">
                              Your security passcode is{" "}
                              <span className="text-white">437829</span>
                            </div>
                          </div>
                        </motion.div>
                      </span>

                      <div className="mt-6 flex flex-wrap justify-between gap-x-2 gap-y-4 text-center">
                        <div className="flex-none">
                          <div className="relative size-10 rounded-[calc(10/16*1rem)] bg-gray-800 shadow-[0_1px_rgb(255,255,255/0.05)_inset]"></div>
                          <div className="mt-1.5 text-[0.625rem]/4 font-medium text-gray-300">
                            Azure
                          </div>
                        </div>
                        <div className="flex-none">
                          <div className="relative size-10 rounded-[calc(10/16*1rem)] bg-gray-800 shadow-[0_1px_rgb(255,255,255/0.05)_inset]">
                            <div className="absolute -left-1.5 -top-1.5 z-10 flex h-5 w-5 scale-75 items-center justify-center rounded-full bg-[#ffffff40] text-[0.625rem]/none font-semibold text-gray-950 shadow-[rgba(107,231,255,0.3)_0px_0px_0px_0px,rgba(255,255,255,0.2)_0px_0px_inset] backdrop-blur duration-100 group-hover:scale-100 group-hover:bg-[#5EE4FF]">
                              1
                            </div>
                          </div>
                          <div className="mt-1.5 text-[0.625rem]/4 font-medium text-gray-300">
                            Jira
                          </div>
                        </div>
                        <div className="flex-none">
                          <div className="relative size-10 rounded-[calc(10/16*1rem)] bg-gray-800 shadow-[0_1px_rgb(255,255,255/0.05)_inset]"></div>
                          <div className="mt-1.5 text-[0.625rem]/4 font-medium text-gray-300">
                            GitHub
                          </div>
                        </div>
                        <div className="flex-none">
                          <div className="relative size-10 rounded-[calc(10/16*1rem)] bg-gray-800 shadow-[0_1px_rgb(255,255,255/0.05)_inset]"></div>
                          <div className="mt-1.5 text-[0.625rem]/4 font-medium text-gray-300">
                            GitLab
                          </div>
                        </div>
                        <div className="flex-none">
                          <div className="relative size-10 rounded-[calc(10/16*1rem)] bg-gray-800 shadow-[0_1px_rgb(255,255,255/0.05)_inset]"></div>
                          <div className="mt-1.5 text-[0.625rem]/4 font-medium text-gray-300">
                            Slack
                          </div>
                        </div>
                        <div className="flex-none">
                          <div className="relative size-10 rounded-[calc(10/16*1rem)] bg-gray-800 shadow-[0_1px_rgb(255,255,255/0.05)_inset]"></div>
                          <div className="mt-1.5 text-[0.625rem]/4 font-medium text-gray-300">
                            Teams
                          </div>
                        </div>
                        <div className="flex-none">
                          <div className="relative size-10 rounded-[calc(10/16*1rem)] bg-gray-800 shadow-[0_1px_rgb(255,255,255/0.05)_inset]"></div>
                          <div className="mt-1.5 text-[0.625rem]/4 font-medium text-gray-300">
                            Linear
                          </div>
                        </div>
                        <div className="flex-none">
                          <div className="relative size-10 rounded-[calc(10/16*1rem)] bg-gray-800 shadow-[0_1px_rgb(255,255,255/0.05)_inset]"></div>
                          <div className="mt-1.5 text-[0.625rem]/4 font-medium text-gray-300">
                            Notion
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="absolute inset-0 translate-y-[2rem] bg-gradient-to-t from-gray-900 duration-300 ease-in-out"
                  ></motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Call to action content - simplified */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm">
              <Sparkles className="size-3.5" />
              <span>DevOps Time Management</span>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/80 bg-clip-text font-heading text-3xl font-semibold text-transparent sm:text-4xl md:text-5xl"
            >
              Unify Your Work Tracking 
              <br className="hidden sm:inline" /> Across All DevOps Tools
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mx-auto mt-4 max-w-2xl text-balance text-base text-muted-foreground"
            >
              Stop switching between platforms and losing track of work. AionTime synchronizes your tasks, time entries, and updates across Azure DevOps, Jira, GitHub, and more—all with AI-driven insights that boost your team&apos;s productivity.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8"
            >
              <Button className="group relative inline-flex items-center gap-2 overflow-hidden bg-primary px-4 py-2 text-primary-foreground">
                <span>Start Your Free 14-Day Trial</span>
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-6 text-sm text-muted-foreground"
            >
              Full access, no credit card required. Free tier includes 3 users and unlimited time tracking.
            </motion.p>
          </div>
        </MaxWidthWrapper>

        <div className="w-full border-t border-dashed border-slate-200/30 dark:border-slate-800/30"></div>
      </div>
    </section>
  );
}
