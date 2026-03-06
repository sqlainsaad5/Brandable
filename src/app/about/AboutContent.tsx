"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Card } from "@/components/ui/Card";
import { ABOUT, OWNERS } from "@/lib/constants";

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
};

export function AboutContent() {
  return (
    <>
      <SectionWrapper className="pt-16">
        <motion.div {...fadeInUp}>
          <h1 className="font-display text-3xl font-semibold text-foreground md:text-4xl">
            {ABOUT.title}
          </h1>
          <p className="mt-6 max-w-2xl text-muted leading-relaxed">
            {ABOUT.mission}
          </p>
        </motion.div>
      </SectionWrapper>

      <SectionWrapper className="bg-surface/30">
        <motion.h2
          className="font-display text-2xl font-semibold text-foreground"
          {...fadeInUp}
        >
          Our values
        </motion.h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {ABOUT.values.map(({ title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{
                duration: 0.4,
                delay: i * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94] as const,
              }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="cursor-default"
            >
              <Card className="h-full transition-shadow hover:shadow-lg hover:shadow-black/10 hover:border-accent/30">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-muted">{description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="pt-16">
        <motion.h2
          className="font-display text-2xl font-semibold text-foreground"
          {...fadeInUp}
        >
          Meet the owners
        </motion.h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          {OWNERS.map((owner, i) => (
            <motion.div
              key={owner.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94] as const,
              }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group cursor-default"
            >
              <Card className="overflow-hidden p-0 h-full transition-shadow hover:shadow-xl hover:shadow-black/15 hover:border-accent/30">
                <div className="aspect-[3/4] w-full overflow-hidden rounded-t-lg bg-surface">
                  <motion.img
                    src={owner.image}
                    alt={owner.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {owner.name}
                  </h3>
                  <p className="mt-1 text-sm text-accent">{owner.role}</p>
                  <p className="mt-3 text-sm text-muted">{owner.bio}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
