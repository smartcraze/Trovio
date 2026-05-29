"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart3, Link2, Sparkles } from "lucide-react";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { LinkItem } from "./types";

interface ChartDataPoint {
  name: string;
  fullName: string;
  clicks: number;
  url: string;
}

interface AnalyticsTabProps {
  links: LinkItem[];
  totalClicks: number;
  chartData: ChartDataPoint[];
  hasClicks: boolean;
  chartMounted: boolean;
  colors: string[];
  onAnalyseWithAi: () => void;
}

export function AnalyticsTab({
  links,
  totalClicks,
  chartData,
  hasClicks,
  chartMounted,
  colors,
  onAnalyseWithAi,
}: AnalyticsTabProps) {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* AI Insights Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card/60 to-secondary/10 backdrop-blur-xl p-6 shadow-xl">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-secondary/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="size-12 rounded-2xl bg-primary/15 border border-primary/25 text-primary flex items-center justify-center shrink-0 shadow-inner">
              <Sparkles size={22} />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-base leading-snug">
                AI Analytics Coach
              </h3>
              <p className="text-sm text-muted-foreground mt-0.5 max-w-sm">
                Get a full breakdown of your link performance, spot
                underperformers, and receive personalised actions to boost your
                clicks.
              </p>
            </div>
          </div>
          <Button
            type="button"
            onClick={onAnalyseWithAi}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-primary/20 shrink-0 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles size={16} />
            Analyse My Analytics
          </Button>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card className="border-border bg-card/60 backdrop-blur-2xl p-6 shadow-xl flex items-center gap-5 rounded-xl">
          <div className="size-14 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0">
            <BarChart3 size={24} />
          </div>
          <div>
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider block">
              Total Link Clicks
            </span>
            <span className="text-3xl font-extrabold text-foreground mt-1 block">
              {totalClicks}
            </span>
          </div>
        </Card>

        <Card className="border-border bg-card/60 backdrop-blur-2xl p-6 shadow-xl flex items-center gap-5 rounded-xl">
          <div className="size-14 rounded-xl bg-secondary/10 border border-secondary/20 text-secondary flex items-center justify-center shrink-0">
            <Link2 size={24} />
          </div>
          <div>
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider block">
              Total Active Links
            </span>
            <span className="text-3xl font-extrabold text-foreground mt-1 block">
              {links.length}
            </span>
          </div>
        </Card>
      </div>

      {/* Charts — only when links exist */}
      {links.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bar chart */}
          <Card className="border-border bg-card/60 backdrop-blur-2xl p-6 shadow-xl rounded-xl">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="font-bold text-sm text-foreground uppercase tracking-wider">
                Clicks Breakdown
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Compare performance metrics across all active links.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 flex items-center justify-center min-h-[300px]">
              {!hasClicks ? (
                <div className="text-center py-12 text-muted-foreground text-xs">
                  No click data recorded yet.
                </div>
              ) : chartMounted ? (
                <div className="h-[300px] w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={chartData}
                      margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
                    >
                      <XAxis
                        dataKey="name"
                        stroke="var(--muted-foreground)"
                        fontSize={10}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="var(--muted-foreground)"
                        fontSize={10}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(val) => `${val}`}
                      />
                      <Tooltip
                        cursor={{ fill: "rgba(255,255,255,0.03)" }}
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-card/95 border border-border p-2.5 rounded-lg shadow-xl backdrop-blur-md text-xs">
                                <p className="font-semibold text-foreground">
                                  {payload[0].payload.fullName}
                                </p>
                                <p className="text-muted-foreground mt-0.5">
                                  Clicks:{" "}
                                  <span className="font-bold text-primary">
                                    {payload[0].value}
                                  </span>
                                </p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar dataKey="clicks" radius={[4, 4, 0, 0]}>
                        {chartData.map((_, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={colors[index % colors.length]}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="text-muted-foreground text-xs">
                  Loading chart...
                </div>
              )}
            </CardContent>
          </Card>

          {/* Pie chart */}
          <Card className="border-border bg-card/60 backdrop-blur-2xl p-6 shadow-xl rounded-xl">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="font-bold text-sm text-foreground uppercase tracking-wider">
                Traffic Distribution
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Visualizing relative share of user clicks.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 flex items-center justify-center min-h-[300px]">
              {!hasClicks ? (
                <div className="text-center py-12 text-muted-foreground text-xs">
                  No click data recorded yet.
                </div>
              ) : chartMounted ? (
                <div className="h-[300px] w-full flex items-center justify-center mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData.filter((d) => d.clicks > 0)}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={85}
                        paddingAngle={4}
                        dataKey="clicks"
                      >
                        {chartData
                          .filter((d) => d.clicks > 0)
                          .map((_, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={colors[index % colors.length]}
                            />
                          ))}
                      </Pie>
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-card/95 border border-border p-2.5 rounded-lg shadow-xl backdrop-blur-md text-xs">
                                <p className="font-semibold text-foreground">
                                  {payload[0].name}
                                </p>
                                <p className="text-muted-foreground mt-0.5">
                                  Clicks:{" "}
                                  <span className="font-bold text-secondary">
                                    {payload[0].value}
                                  </span>
                                </p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="text-muted-foreground text-xs">
                  Loading chart...
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Click Performance List */}
      <Card className="border-border bg-card/60 backdrop-blur-2xl p-6 sm:p-8 shadow-xl rounded-xl">
        <CardHeader className="p-0 mb-6">
          <CardTitle className="font-bold text-lg text-foreground">
            Click Performance List
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0 space-y-4">
          {links.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">
              No links configured yet.
            </p>
          ) : (
            links.map((link) => {
              const percentage =
                totalClicks > 0
                  ? Math.round(((link.clickCount || 0) / totalClicks) * 100)
                  : 0;
              return (
                <div key={link.id} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">
                      {link.title}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      <span className="font-bold text-foreground">
                        {link.clickCount || 0}
                      </span>{" "}
                      clicks ({percentage}%)
                    </span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </div>
  );
}
