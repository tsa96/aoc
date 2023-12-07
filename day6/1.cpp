#include <math.h>
#include <stdio.h>
#include <vector>

/* Let  Tt := time total (given)
 *		Tc := time charging
 * 		Tm := time moving
 * 		d  := distance given
 *
 * From description,
 * 		Tt = Tc + Tm
 * 		d  < Tc * Tm,
 * 		solve for Tc
 *
 * Rearranging,
 * 		Tm = Tt - Tc
 * 	  ∴	d  <  Tc   + (Tt - Tc)
 * 		   < -Tc^2 + Tt * Tc
 * 	  ∴ Tc^2 - Tt*Tc + d < 0
 *
 * So we have quadratic ax^2 + bx + c < 0 with coefficients a = 1, b = -Tt, c = d
 *
 * Strategy: find all integer values between roots.
 * 0 or infinite charging times make no sense, data given presumably can't result in that
 *
 * Tt cannot be < 0, so our `b` term is always positive.
 * Discriminant is always positive, so the negative discrimant
 * solution must always be less than the positive. So [X, Y]
 * pair is always ordered X < Y, so return value is always positive.
 */
int raceWinCount(int time, int distance)
{
	// Tt cannot be < 0, so our `b` term is always positive.
	// Discriminant is always positive, so the negative discrimant
	// solution must always be less than the positive. So [X, Y]
	// pair is always ordered X < Y, so return value is always positive.
	double sqrtDisc = sqrt(pow(time, 2) - 4 * distance);
	double root1 = (time - sqrtDisc) / 2;
	double root2 = (time + sqrtDisc) / 2;
	int wins = ceil(root2) - floor(root1) - 1;
	printf("Wins: %i, Roots: %f %f\n", wins, root1, root2);
	return wins;
}

int main()
{
	std::vector<std::pair<int, int>> input{
		{47, 400},
		{98, 1213},
		{66, 1011},
		{98, 1540}};

	int product = 1;
	for (auto [time, distance] : input)
		product *= raceWinCount(time, distance);

	printf("Total: %i\n", product);
}
