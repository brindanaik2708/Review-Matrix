import { describe, expect, it } from "vitest";
import { scoreHunk } from "@/lib/risk";
describe("risk scorer", () => { it("raises a destructive database hunk to critical", () => { const result = scoreHunk("src/db/users.ts", "+ await db.user.deleteMany({ where: {} })", "db", "base"); expect(result.score).toBe(89); expect(result.level).toBe("critical"); }); it("returns deterministic results", () => { expect(scoreHunk("a.ts", "+ return true", "logic", "x")).toEqual(scoreHunk("a.ts", "+ return true", "logic", "x")); }); });
