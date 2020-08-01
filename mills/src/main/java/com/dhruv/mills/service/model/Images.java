package com.dhruv.mills.service.model;

import java.awt.image.BufferedImage;
import java.net.URL;
import java.util.List;

import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * Class to store images for mill
 * 
 * @author Vishwas
 *
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Embeddable
public class Images {

	private URL thumbnailImage;
	private List<URL> imagesList;
}
